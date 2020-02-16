import axios from "axios";
import { notification } from "ant-design-vue";
function request(options) {
  return axios(options)
    .then(res => {
      return res;
    })
    .catch(error => {
      const {
        response: { status, statusText }
      } = error;
      // notification.error({
      //     message: status,
      //     description: statusText
      // });
      //jsx语法可以改写为
      notification.error({
        //eslint-disable-next-line
            message: h => (
          <div>
            请求错误<span style="color:red">{status}</span>:<br />
            {options.url}
          </div>
        ),
        description: statusText
      });
      return Promise.reject(error);
    });
}

export default request;
