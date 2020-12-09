const fantasy = require('espn-fantasy-football-api/node');
const fantasyClient = new fantasy.Client({ leagueId: 76142556 });
const S2 = 'AEBt4nKVCrKilcI7jSK%2BS0vJnf7BJk3mnwomlehO3FikXM5GdOoBHa0kzM8iaWk9ehs6SiTYdr4EK2bmmq3FKnlZOTBzjPArWUM0L2VIHqDPXzhWGdiLv2mpMlz9wFqfwdOMQQfac6hh8560gpTr%2BAQlL0T%2FjeTDlcwTu2cAc70CbuMUbHt6CFdtpSTdFSk%2B2WhDlXWIS4mlJyalzXrfhT4r8TPI5zK90dEVEASuVcHF07O9%2FiyTc8W6fYNQiZNhI2ldCdykurHZzJbr56Ifhmyz';
const SWID = '121E2C51-881F-4A9C-923A-49D15C4B6A7D';
fantasyClient.setCookies({ espnS2: S2, SWID: SWID });

function compare(a,b){
    if(a.wins < b.wins) return 1;
    else if(a.wins > b.wins) return -1;
    else if(a.totalPointsScored < b.totalPointsScored) return 1;
    else if(a.totalPointsScored > b.totalPointsScored) return -1;
    else return 0;
}

exports.run = (client, message, args) => {
    fantasyClient.getTeamsAtWeek({seasonId: 2020, scoringPeriodId: 18})
    .then(
        teams => {
            teams.sort(compare);
            let teamlist = 'Fantasy 2020 Rankings\n--------------------\n';
            teams.forEach( function( team, index )  {
                let ranking = index + 1;
                teamlist += `#${ranking} - ${team.name}: ${team.wins}-${team.losses} \n`;
            });
            message.channel.send(teamlist);
        }
    ).catch(
        err => {
            console.log(err);
            message.channel.send("Sorry bro, something went wrong.");
        }
    );
    
}