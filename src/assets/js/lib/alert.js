import Vue from 'vue'
import Confirm from '../../../components/MessageBox/confirm.vue'


const AlertConstructor = {};
const AlertConstructorManager = Vue.extend(Confirm);

const div = document.createElement('div');

// AlertConstructor.confirm = (options) => {
//     let tempOptions = options ? options : {};
//     document.body.appendChild(div);
//     tempOptions.type = 'confirm';
//     tempOptions.store = store;
//     const propsData = Object.assign({}, tempOptions);
//     const alertInstance = new AlertConstructorManager({
//         propsData,
//     }).$mount(div);
//     alertInstance.show();
// };

AlertConstructor.confirm = (msg, btnList) => {
    let tempOptions = {};
    document.body.appendChild(div);
    tempOptions.config = {
        type: 'confirm',
        content: msg,
        btnList: btnList
    }
    const propsData = Object.assign({}, tempOptions);
    const alertInstance = new AlertConstructorManager({
        propsData,
    }).$mount(div);
    alertInstance.show();
};

export default AlertConstructor;