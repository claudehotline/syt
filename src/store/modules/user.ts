//定义用户相关的仓库
import { defineStore } from 'pinia';

const useUserStore = defineStore('User', {
    state: () => {
        return {
            visible: false
        }
    },
    actions:{

    },
    getters:{

    }
});

export default useUserStore