
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
//for scroll
import Vue from 'vue'
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)
// for notify
import Toaster from 'v-toaster'
Vue.use(Toaster, {timeout: 5000})
import 'v-toaster/dist/v-toaster.css'

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

Vue.component('message', require('./components/message.vue'));

// const files = require.context('./', true, /\.vue$/i)

// files.keys().map(key => {
//     return Vue.component(_.last(key.split('/')).split('.')[0], files(key))
// })

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    data:{
    	message:'',
    	chat:{
    		message:[],
    		user:[],
    		color:[],
    		time:[]
    	},
    	typing:'',
    	numberOfUsers:0
    },
    watch:{
    		message(){
    			Echo.private('chat')
			    .whisper('typing', {
			        name: this.message
			    });
    		}
    	},
    methods:{
    	send(){
    		if(this.message.length != 0){
    			this.chat.message.push(this.message);
    			this.chat.color.push('success');
    			this.chat.user.push('You');
    			this.chat.time.push(this.getTime());
    			axios.post('/send', {
				    message:this.message,
				    chat:this.chat
				  })
				  .then(response => {
				    console.log(response);
				    this.message='';
				  })
				  .catch(error => {
				    console.log(error);
				  });
    		}
    	},
    	getTime(){
    		let time = new Date();
    		return time.getHours()+":"+time.getMinutes();
    	},
    	getOldMessage(){
    			axios.post('/getOldMessage')
			  	.then(response => {
			    console.log(response);
			    if(response.data!=''){
			    	this.chat=response.data;
			    }
			  	})
			  .catch(error => {
			    console.log(error);
			  });		
    	},
    	deleteSession(){
    		axios.post('/deleteSession')
    		.then(response=>{
    			this.$toaster.success('Chat history is deleted')

    		});
    	}
    	
    },
    mounted(){
    	this.getOldMessage();
    	Echo.private('chat')
    	.listen('ChatEvent', (e) => {
    	this.chat.message.push(e.message);
    	this.chat.color.push('warning');
    	this.chat.user.push(e.user.name);
    	this.chat.time.push(this.getTime());
    	axios.post('/saveToSession',{
    		chat:this.chat
    	})
	  	.then(response => {
	  		})
	  .catch(error => {
	    console.log(error);
	  		});

        //console.log(e);
    	})
	    .listenForWhisper('typing', (e) => {
	    	if(e.name!=''){
	    		this.typing=' is typing...';
	    		//console.log('typing')
	    	}else{
	    	this.typing='';
	    	//console.log('');
	    	}
	    });

	    Echo.join('chat')
		    .here((users) => {
		    	this.numberOfUsers=users.length;
		    })
		    .joining((user) => {
		    	this.numberOfUsers+=1;
		        console.log(user.name);
		       	this.$toaster.success(user.name+' has joined the chat room')

		    })
		    .leaving((user) => {
		    	this.numberOfUsers-=1;
		       console.log(user.name);
		       this.$toaster.warning(user.name+' has left the chat room')
		    });
    }
});
