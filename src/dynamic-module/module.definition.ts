import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface DynamicModuleOptions {
  aaa: number;
  bbb: string;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<DynamicModuleOptions>().build();
