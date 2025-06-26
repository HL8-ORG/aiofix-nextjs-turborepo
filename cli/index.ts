#!/usr/bin/env node

import { program } from 'commander';

/**
 * 使用 Commander.js 构建命令行工具
 *
 * @remarks
 * Commander.js 是一个完整的 node.js 命令行解决方案。这里我们定义了两个主要命令:
 * 1. init - 用于初始化新项目
 * 2. update - 用于项目版本更新
 */

/**
 * 初始化命令配置
 *
 * @remarks
 * 通过 program.command() 创建 init 子命令
 * 支持以下选项:
 * - --name: 设置项目名称
 * - --package-manager: 选择包管理器
 * - --disable-git: 禁用 git 初始化
 */
program
  .command('init')
  .description('Initialize a new next-forge project')
  .option('--name <name>', 'Name of the project')
  .option(
    '--package-manager <manager>',
    'Package manager to use (npm, yarn, bun, pnpm)'
  )
  .option('--disable-git', 'Disable git initialization')
  .action(() => {
    const msg = '启动了 init 命令';
    console.log('🚀 ~ .action ~ msg:', msg);
  });

/**
 * 解析命令行参数
 *
 * @remarks
 * Commander 会自动解析 process.argv 中的参数
 * 根据定义的命令和选项执行相应的 action 处理函数
 */
program.parse(process.argv);
