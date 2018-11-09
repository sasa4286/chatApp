<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="csrf-token" content="{{csrf_token()}}">
	<title></title>
	<link rel="stylesheet" href="{{ asset("css/app.css") }}">
	<style>
		.list-group{
			overflow-y: scroll;
			height: 200px;
		}
	</style>
</head>
<body>
	
	<div class="container">
		<div class="row" id="app">
			<div class="offset-md-3 col-lg-6">
				<li class="list-group-item active ">Chat Room <span class="badge badge-pill badge-danger">@{{numberOfUsers}}</span><a href="" class="btn btn-warning btn-sm float-right" @click.prevent="deleteSession" >Delete Chats</a></li>
				<div class="badge badge-pill badge-primary">@{{ typing }}</div>
				<ul class="list-group" v-chat-scroll>
				<message v-for="value,index in chat.message" :key=value.index :color=chat.color[index] :user=chat.user[index] :time=chat.time[index] >
						@{{value}}
				</message>
			</ul>
				<input type="text" class="form-control" placeholder="Type your message here..." v-model="message" @keyup.enter="send">
			</div>
		</div>
	</div>
	<script src="{{ asset("js/app.js") }}"></script>
</body>
</html>