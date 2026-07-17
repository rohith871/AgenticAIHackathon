import { ExecutionContext } from '@nitrostack/core';
export declare class FilesystemTools {
    private resolveSafePath;
    readFile(input: {
        path: string;
    }, ctx: ExecutionContext): Promise<{
        content: string;
    }>;
    writeFile(input: {
        path: string;
        content: string;
    }, ctx: ExecutionContext): Promise<{
        success: boolean;
        path: string;
    }>;
    listDirectory(input: {
        path: string;
    }, ctx: ExecutionContext): Promise<{
        files: {
            name: string;
            type: string;
            size: number | undefined;
        }[];
    }>;
}
//# sourceMappingURL=filesystem.tools.d.ts.map