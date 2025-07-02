'use client';

import { useCallback, useEffect, useState } from 'react';

import { DynamicIcon } from '@/components/dynamic-icon';
import { Button } from '@repo/design-system/components/shadcn-ui/button';

/**
 * 扩展全局 Document 和 HTMLElement 接口以处理不同浏览器的全屏 API
 * @description
 * 由于历史原因,不同浏览器实现全屏 API 的方式不同:
 * - 标准: requestFullscreen/exitFullscreen
 * - Webkit: webkitRequestFullscreen/webkitExitFullscreen
 * - IE: msRequestFullscreen/msExitFullscreen
 */
declare global {
  interface Document {
    webkitExitFullscreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
    webkitFullscreenElement?: Element | null;
    msFullscreenElement?: Element | null;
  }

  interface HTMLElement {
    webkitRequestFullscreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
  }
}

/**
 * 全屏切换组件
 * @returns 渲染全屏切换按钮的 React 组件
 * @description
 * 实现机制:
 * 1. 使用 useState 管理全屏状态
 * 2. 通过 useCallback 和 useEffect 处理全屏变化事件
 * 3. 支持多浏览器全屏 API:
 *    - 标准 Fullscreen API
 *    - Webkit 前缀版本
 *    - IE 前缀版本
 * 4. 组件仅在中等屏幕及以上显示(md:inline-flex)
 */
export function FullscreenToggle() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  /**
   * 退出全屏模式
   * @description 尝试使用不同浏览器的退出全屏 API
   */
  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  /**
   * 进入全屏模式
   * @param element - 要全屏显示的 HTML 元素
   * @description 尝试使用不同浏览器的请求全屏 API
   */
  const enterFullscreen = (element: HTMLElement) => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else {
      alert('Fullscreen mode is not supported in this browser.');
    }
  };

  /**
   * 切换全屏状态
   * @description 根据当前全屏状态决定进入或退出全屏模式
   */
  const toggleFullscreen = () => {
    const element = document.documentElement;

    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen(element);
    }
  };

  /**
   * 处理全屏状态变化
   * @description
   * 1. 使用 useCallback 缓存函数以优化性能
   * 2. 检查各种浏览器的全屏元素属性来更新状态
   */
  const handleFullscreenChange = useCallback(() => {
    setIsFullscreen(
      !!document.fullscreenElement ||
        !!document.webkitFullscreenElement ||
        !!document.msFullscreenElement
    );
  }, []);

  /**
   * 设置全屏变化事件监听
   * @description
   * 1. 组件挂载时添加各浏览器的全屏变化事件监听
   * 2. 组件卸载时移除事件监听以防内存泄漏
   * 3. 依赖于 handleFullscreenChange 以确保使用最新的回调函数
   */
  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange
      );
      document.removeEventListener(
        'msfullscreenchange',
        handleFullscreenChange
      );
    };
  }, [handleFullscreenChange]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleFullscreen}
      aria-label="Toggle Fullscreen"
      className="hidden md:inline-flex"
    >
      <DynamicIcon
        name={isFullscreen ? 'Shrink' : 'Expand'}
        className="size-4"
      />
    </Button>
  );
}
