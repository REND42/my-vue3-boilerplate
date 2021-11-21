import { _RouteRecordBase } from "vue-router";

// 合并接口，把两个同名接口属性合并到一起
declare module "vue-router" {
  interface _RouteRecordBase {
    hidden?: boolean | string | number
  }
}