import Vue from 'vue'
import Router from 'vue-router'
import Text from '@/components/Text'
import Father from '@/components/Father'

Vue.use(Router)


export default new Router({
    routes: [{
            path: '/',
            name: 'Text',
            component: Text
        },
        {
            path: '/father',
            name: 'Father',
            component: Father
        }
    ]
})