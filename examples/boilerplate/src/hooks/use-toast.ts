'use client';

// Inspired by react-hot-toast library
import { useEffect, useState } from 'react';

import type {
  ToastActionElement,
  ToastProps,
} from '@repo/design-system/components/toast';
import type { ReactNode } from 'react';

/** 最大允许显示的 Toast 数量 */
const TOAST_LIMIT = 1;

/** Toast 自动移除的延迟时间(毫秒) */
const TOAST_REMOVE_DELAY = 1000000;

/**
 * Toast 组件的属性类型定义
 * 继承自基础 ToastProps,并添加了额外的属性
 */
type ToasterToast = ToastProps & {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  action?: ToastActionElement;
};

/** 用于生成唯一ID的计数器 */
let count = 0;

/**
 * 生成唯一的 Toast ID
 * @returns 返回一个字符串类型的唯一ID
 */
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

/**
 * Toast 操作类型的枚举
 */
type ActionType = {
  ADD_TOAST: 'ADD_TOAST';
  UPDATE_TOAST: 'UPDATE_TOAST';
  DISMISS_TOAST: 'DISMISS_TOAST';
  REMOVE_TOAST: 'REMOVE_TOAST';
};

/**
 * Toast 操作的联合类型
 * 包含添加、更新、关闭和移除 Toast 的操作
 */
type Action =
  | {
      type: ActionType['ADD_TOAST'];
      toast: ToasterToast;
    }
  | {
      type: ActionType['UPDATE_TOAST'];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType['DISMISS_TOAST'];
      toastId?: ToasterToast['id'];
    }
  | {
      type: ActionType['REMOVE_TOAST'];
      toastId?: ToasterToast['id'];
    };

/**
 * Toast 状态接口
 */
interface State {
  toasts: ToasterToast[];
}

/** 存储 Toast 超时定时器的 Map */
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * 将 Toast 添加到移除队列
 * @param toastId - 要移除的 Toast 的ID
 */
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

/**
 * Toast 状态管理的 reducer
 * 处理添加、更新、关闭和移除 Toast 的逻辑
 */
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case 'DISMISS_TOAST': {
      const { toastId } = action;

      // ! 副作用 ! - 这可以提取到 dismissToast() 操作中,
      // 但为了简单起见保留在这里
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        for (const toast of state.toasts) {
          addToRemoveQueue(toast.id);
        }
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case 'REMOVE_TOAST': {
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    }
    default:
      return state;
  }
};

/** 状态更新监听器数组 */
const listeners: Array<(state: State) => void> = [];

/** 内存中的状态 */
let memoryState: State = { toasts: [] };

/**
 * 分发 action 并通知所有监听器
 * @param action - 要分发的操作
 */
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  for (const listener of listeners) {
    listener(memoryState);
  }
}

/** Toast 属性类型,排除 id 字段 */
type Toast = Omit<ToasterToast, 'id'>;

/**
 * 创建一个新的 Toast
 * @param props - Toast 的属性
 * @returns 包含 Toast 控制方法的对象
 */
function toast({ ...props }: Toast) {
  const id = genId();
  // 更新 Toast 的属性
  const update = (props: ToasterToast) =>
    dispatch({
      type: 'UPDATE_TOAST',
      toast: { ...props, id },
    });
  // 关闭 Toast
  const dismiss = () => dispatch({ type: 'DISMISS_TOAST', toastId: id });

  // 添加 Toast
  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) {
          dismiss();
        }
      },
    },
  });

  // 返回 Toast 控制方法的对象
  return {
    id: id,
    dismiss,
    update,
  };
}

/**
 * Toast 钩子函数
 * 提供 Toast 状态管理和控制方法
 * @returns Toast 状态和控制方法
 */
function useToast() {
  const [state, setState] = useState<State>(memoryState);

  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: 'DISMISS_TOAST', toastId }),
  };
}

export { useToast, toast };
