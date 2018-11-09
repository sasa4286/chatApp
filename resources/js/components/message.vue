<template>
    <div>
        <li class="list-group-item" :class="className"><slot></slot>
            <span id="time">{{ time }}</span></li>
        <small class="badge float-right" :class="badgeClass">{{ user }}</small>
    </div>
</template>

<script>
    export default {
        props:[
            'color',
            'user',
            'time'
        ],
        computed:{
            className(){
                return 'list-group-item-'+this.color;
            },
            badgeClass(){
                return 'badge-'+this.color;
            }
        },
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>
<style type="text/css">
    #time{
        font-size: 8px;
        margin-top: 10px;
        color: white;
        background-color: rgba(0, 0, 0, .3);
        padding: 1px;
        padding-right: 2px;
        border-radius: 20px;
    }
</style>