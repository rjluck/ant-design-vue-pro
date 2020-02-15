<script>
//权限组件弊端：写法复杂，但是灵活哦
import { check } from "../utils/auth";
export default {
  //函数式组件
  functional: true,
  props: {
    authority: {
      type: Array,
      require: true
    }
  },
  render(h, context) {
    const { props, scopedSlots } = context;
    return check(props.authority) ? scopedSlots.default() : null;
  }
};
</script>
<style></style>
