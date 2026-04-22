declare module "openclaw/plugin-sdk/plugin-entry" {
  export type OpenClawPluginToolContext = {
    sessionKey?: string;
  };

  export type OpenClawPluginRegisterApi = {
    pluginConfig?: Record<string, unknown>;
    config: unknown;
    logger: {
      info(message: string): void;
      warn(message: string): void;
    };
    runtime: {
      state: {
        resolveStateDir(): string;
      };
      channel: {
        outbound: {
          loadAdapter(channelId: string): Promise<{
            sendText?: (params: {
              cfg: unknown;
              to: string;
              text: string;
              accountId?: string;
            }) => Promise<unknown>;
          } | null | undefined>;
        };
      };
    };
    on(
      hookName: string,
      handler: (event: any, ctx: any) => Promise<any> | any
    ): void;
    registerTool(
      factory: (ctx: OpenClawPluginToolContext) => {
        name: string;
        description: string;
        parameters: Record<string, unknown>;
        execute(
          toolCallId: string,
          params: any
        ): Promise<{
          content: Array<{ type: string; text: string }>;
          details?: Record<string, unknown>;
        }>;
      },
      options?: { name?: string }
    ): void;
  };

  export function definePluginEntry(entry: {
    id: string;
    name: string;
    description?: string;
    register(api: OpenClawPluginRegisterApi): void;
  }): unknown;
}
