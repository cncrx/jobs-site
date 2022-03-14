import Vue from 'vue'
import {
  Card, Icon, ButtonGroup, Button, Divider, Pagination, Input, Select, Option, Message, Notification, Link, Form, FormItem, Tag,Table,
  TableColumn,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "element-ui/lib/theme-chalk/display.css"

Vue.use(Button)
Vue.use(Card)
Vue.use(Icon)
Vue.use(ButtonGroup)
Vue.use(Button)
Vue.use(Divider)
Vue.use(Pagination)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Link)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tag)
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Table);
Vue.use(TableColumn);

Vue.prototype.$message = Message;
Vue.prototype.$notify = Notification;

