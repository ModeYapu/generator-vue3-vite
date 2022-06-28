import { createApp } from "vue";
import App from "./App.vue";

import Router from "./router";
import { createPinia } from "pinia";

import "amfe-flexible";
import {
  Button,
  Tab,
  Tabs,
  RadioGroup,
  Radio,
  Checkbox,
  CheckboxGroup,
  Dialog as VanDialog,
  Popup,
  Cascader,
  Overlay,
  ConfigProvider,
  Tabbar, TabbarItem
} from "vant";

const app = createApp(App);
app.use(Router);
app.use(createPinia());
app.use(Button);
app.use(Tab);
app.use(Tabs);
app.use(RadioGroup);
app.use(Radio);
app.use(Checkbox);
app.use(CheckboxGroup);
app.use(VanDialog);
app.use(Popup);
app.use(Cascader);
app.use(Overlay);
app.use(ConfigProvider);
app.use(Tabbar);
app.use(TabbarItem);
app.mount("#app");
