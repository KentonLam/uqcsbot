// Description
//   Wakie Wakie - Pings a random person in #general and asks what they are up to
//

var HubotCron = require('hubot-cronjob');

module.exports = function(robot) {
	var fn, pattern, timezone;
	pattern = '30 17 * * *'; // Daily at 5:30PM
	timezone = 'Australia/Brisbane';

	fn = function() {
		var general = robot.adapter.client.getChannelGroupOrDMByName("general");
		var victim = general.members[Math.floor(Math.random() * general.members.length)];
		robot.http("https://slack.com/api/users.info").header('Accept', 'application/json').post({
			'token': process.env.HUBOT_SLACK_TOKEN,
			'user': victim,
		})(function(err, resp, body){
			return robot.messageRoom("general", "Hey @" + JSON.parse(body).user.name + "! Tell us about something cool you are working on!");
		});

	};
	return new HubotCron(pattern, timezone, fn);
};
