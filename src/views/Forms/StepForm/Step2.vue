<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账户"
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
        >{{ step.payAccount }}</a-form-item
      >

      <a-form-item
        label="密码"
        :labelCol="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'password',
            {
              rules: [{ required: true, message: '请输入密码' }],
              initialValue: ''
            }
          ]"
          placeholder="请输入密码"
          type="password"
        ></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="handleSubmit">提交</a-button>
        <a-button style="marginLeft:2px" @click="onPrev">上一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
export default {
  data() {
    this.form = this.$form.createForm(this); //创建form实例
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    };
  },
  computed: {
    step() {
      return this.$store.state.form.step;
    }
  },
  methods: {
    handleSubmit() {
      const { form, $router, $store, step } = this;
      form.validateFields((err, values) => {
        if (!err) {
          $store.dispatch({
            type: "form/submitStepForm",
            payload: { ...step, ...values }
          });
          //跳转到第3步
          $router.push("/form/step-form/result");
        }
      });
    },
    onPrev() {
      //跳转到第1步
      this.$router.push("/form/step-form/info");
    }
  }
};
</script>
<style></style>
