var gith = require('gith').create(3420);
var exec = require('child_process').exec;
var fs = require("fs");
var util = require('util');

gith({}).on('all', function (payload){
	if(typeof payload == 'undefined')
		return;
	if(typeof payload.original == 'undefined')
		return;
	payload.original = JSON.parse(payload.original);
	if(typeof payload.original.repository == 'undefined')
		return;
	if(typeof payload.original.repository.full_name == 'undefined')
		return;

	// This way the program doesn't need to be restarted if the config is changed
	var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
	for( var index in config.repos ){
		var repo = config.repos[index];
		if(repo.name === payload.original.repository.full_name){
			exec(util.format("cd %s && git pull && %s", repo.path, repo.make));
		}
	}
});

/*
for( var index in config.repos){
	var repo = config.repos[index];
	var uno = gith(
		{'repo': repo.name}
	).on('all', function (payload){
		if(payload && payload.repo && repo.name == payload.repo){
			// string format in here
			// exec "cd and pull"
			// if "make" in repo, cd and pull and make
			console.log("success");
		}
		else
			console.log(payload);
	});
	console.log(uno);
}
*/
