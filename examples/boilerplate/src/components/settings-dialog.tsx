'use client';

import {
  Bell,
  Check,
  Globe,
  Home,
  Keyboard,
  Link,
  Lock,
  Menu,
  MessageCircle,
  Paintbrush,
  Settings,
  Video,
} from 'lucide-react';
import * as React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@repo/design-system/components/shadcn-ui/breadcrumb';
import { Button } from '@repo/design-system/components/shadcn-ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@repo/design-system/components/shadcn-ui/dialog';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from '@repo/design-system/components/shadcn-ui/sidebar';
/**
 * 导航菜单数据配置
 * @description
 * 定义了一个包含导航菜单项的数据对象,每个菜单项包含:
 * - name: 菜单项名称
 * - icon: 对应的Lucide图标组件
 */
const data = {
  nav: [
    { name: 'Notifications', icon: Bell },
    { name: 'Navigation', icon: Menu },
    { name: 'Home', icon: Home },
    { name: 'Appearance', icon: Paintbrush },
    { name: 'Messages & media', icon: MessageCircle },
    { name: 'Language & region', icon: Globe },
    { name: 'Accessibility', icon: Keyboard },
    { name: 'Mark as read', icon: Check },
    { name: 'Audio & video', icon: Video },
    { name: 'Connected accounts', icon: Link },
    { name: 'Privacy & visibility', icon: Lock },
    { name: 'Advanced', icon: Settings },
  ],
};

/**
 * 设置对话框组件
 * @component
 * @description
 * 实现了一个响应式的设置对话框,主要包含以下机制:
 * 1. 状态管理:
 *   - 使用useState管理对话框的开关状态
 *   - 通过open和onOpenChange控制对话框显示
 *
 * 2. 布局结构:
 *   - 使用Dialog组件作为对话框容器
 *   - 内部分为左侧导航栏和右侧主内容区域
 *   - 设置最大宽高限制(md:max-h-[500px], md:max-w-[700px])
 *
 * 3. 响应式设计:
 *   - 移动端隐藏侧边导航栏(hidden md:flex)
 *   - 桌面端显示完整的双栏布局
 *   - 面包屑导航在移动端部分隐藏
 *
 * 4. 交互功能:
 *   - 支持通过按钮触发对话框打开
 *   - 侧边栏菜单项支持激活状态显示
 *   - 主内容区域支持滚动(overflow-y-auto)
 *
 * 5. 无障碍支持:
 *   - 使用sr-only类隐藏标题和描述文本
 *   - 保留语义化结构便于屏幕阅读器识别
 */
export function SettingsDialog() {
  const [open, setOpen] = React.useState(true);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <DialogTitle className="sr-only">Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your settings here.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {data.nav.map((item) => (
                      <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                          asChild
                          isActive={item.name === 'Messages & media'}
                        >
                          <a href="#">
                            <item.icon />
                            <span>{item.name}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
          <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="#">Settings</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Messages & media</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-video max-w-3xl rounded-xl bg-muted/50"
                />
              ))}
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}
