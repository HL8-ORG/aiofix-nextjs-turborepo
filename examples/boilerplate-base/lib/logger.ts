import * as fs from 'fs';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
/**
 * 日志记录器配置和实现
 * 
 * @description
 * 这是一个使用 winston 实现的日志记录系统。
 * 它负责处理应用程序的日志记录,支持文件和控制台两种输出方式。
 * 
 * @principle 工作原理
 * 1. 日志存储机制:
 *    - 自动创建日志目录
 *    - 按日期切割日志文件
 *    - 支持日志文件压缩和自动清理
 * 
 * 2. 日志格式机制:
 *    - 文件日志使用JSON格式
 *    - 控制台日志使用彩色简单格式
 *    - 统一添加时间戳
 * 
 * 3. 日志级别机制:
 *    - 文件日志默认info级别
 *    - 控制台日志默认debug级别
 *    - 支持动态调整日志级别
 * 
 * @implements
 * - 使用 winston 实现日志记录
 * - 使用 winston-daily-rotate-file 实现日志轮转
 * - 实现多传输目标支持
 * - 支持自定义日志目录配置
 */

const logDir: string = process.env.LOG_DIR || 'log';

// 确保日志目录存在
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// 配置文件传输器
const fileTransport = new winston.transports.DailyRotateFile({
  filename: `${logDir}/%DATE%-results.log`,
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '3d',
  level: 'info',
});

// 创建日志记录器实例
const logger: winston.Logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.json()
  ),
  transports: [
    fileTransport,
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

export default logger;
