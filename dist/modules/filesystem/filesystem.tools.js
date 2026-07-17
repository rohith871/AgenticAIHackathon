var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ToolDecorator as Tool, z, Injectable } from '@nitrostack/core';
import * as fs from 'fs';
import * as path from 'path';
let FilesystemTools = class FilesystemTools {
    resolveSafePath(userPath) {
        const rootDir = process.cwd();
        // Resolve relative path to absolute
        const resolvedPath = path.isAbsolute(userPath)
            ? path.normalize(userPath)
            : path.normalize(path.join(rootDir, userPath));
        // Ensure the path is within the workspace directory
        if (!resolvedPath.startsWith(rootDir)) {
            throw new Error(`Access Denied: Path "${userPath}" is outside the project root directory.`);
        }
        return resolvedPath;
    }
    async readFile(input, ctx) {
        const safePath = this.resolveSafePath(input.path);
        if (!fs.existsSync(safePath)) {
            throw new Error(`File not found: ${input.path}`);
        }
        const stat = fs.statSync(safePath);
        if (!stat.isFile()) {
            throw new Error(`Path is not a file: ${input.path}`);
        }
        const content = fs.readFileSync(safePath, 'utf-8');
        return { content };
    }
    async writeFile(input, ctx) {
        const safePath = this.resolveSafePath(input.path);
        // Ensure parent directory exists
        const parentDir = path.dirname(safePath);
        if (!fs.existsSync(parentDir)) {
            fs.mkdirSync(parentDir, { recursive: true });
        }
        fs.writeFileSync(safePath, input.content, 'utf-8');
        return { success: true, path: input.path };
    }
    async listDirectory(input, ctx) {
        const safePath = this.resolveSafePath(input.path);
        if (!fs.existsSync(safePath)) {
            throw new Error(`Directory not found: ${input.path}`);
        }
        const stat = fs.statSync(safePath);
        if (!stat.isDirectory()) {
            throw new Error(`Path is not a directory: ${input.path}`);
        }
        const rawFiles = fs.readdirSync(safePath);
        const files = rawFiles.map(file => {
            const filePath = path.join(safePath, file);
            const fileStat = fs.statSync(filePath);
            return {
                name: file,
                type: fileStat.isDirectory() ? 'directory' : 'file',
                size: fileStat.isFile() ? fileStat.size : undefined
            };
        });
        return { files };
    }
};
__decorate([
    Tool({
        name: 'read_file',
        description: 'Read the contents of a file in the workspace.',
        inputSchema: z.object({
            path: z.string().describe('The path to the file (relative to project root or absolute)')
        }),
        examples: {
            request: { path: 'package.json' },
            response: { content: '{\n  "name": "medtriage-mcp" ... }' }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FilesystemTools.prototype, "readFile", null);
__decorate([
    Tool({
        name: 'write_file',
        description: 'Write or overwrite contents of a file in the workspace.',
        inputSchema: z.object({
            path: z.string().describe('The path to the file (relative to project root or absolute)'),
            content: z.string().describe('The content to write to the file')
        }),
        examples: {
            request: { path: 'test.txt', content: 'hello world' },
            response: { success: true, path: 'test.txt' }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FilesystemTools.prototype, "writeFile", null);
__decorate([
    Tool({
        name: 'list_directory',
        description: 'List contents of a directory in the workspace.',
        inputSchema: z.object({
            path: z.string().default('.').describe('The path to the directory (relative to project root or absolute)')
        }),
        examples: {
            request: { path: '.' },
            response: { files: [{ name: 'package.json', type: 'file', size: 919 }] }
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FilesystemTools.prototype, "listDirectory", null);
FilesystemTools = __decorate([
    Injectable()
], FilesystemTools);
export { FilesystemTools };
//# sourceMappingURL=filesystem.tools.js.map