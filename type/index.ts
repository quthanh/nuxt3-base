import type { DayJS } from "@/plugins/date";
import type { DisplayPlugin } from "@/plugins/display";
import type { IconPlugin } from "~/plugins/icon";
import type { ToastPlugin } from "~/plugins/toast";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $date: DayJS;
    $display: DisplayPlugin;
    $toast: ToastPlugin;
    $icon: IconPlugin;
  }
}

export {};
