/*
    id (socket): xxxxxxxxxxx,
    name: 'Ricardo',
    rum: 'videospel'
*/


class Users {
    constructor() {
            this.members = [];
        }
        //ladda en ny user
    addUser(id, name, rummet) {
            // man skapar en ny chat member
            let member = { id, name, rummet };
            //man ladda i general list
            this.members.push(member);
            return this.members;
        }
        // get info om en member genom socket id
    getUser(id) {
            let user = this.members.filter(member => {
                if (member.id === id) {
                    return member;
                }
            })[0];
            return user;
        }
        // hämta alla users
    getUsers() {
            return this.members;
        }
        //hämta users från ett specifik rum
    getUsersByRum(rummet) {
            let usersInRum = this.members.filter(member => {
                if (rummet === member.rummet) {
                    return member
                }
            })
            return usersInRum;
        }
        // radera user
    deleteUser(id) {
        // vi ska skapa en referens om user för tar bort innan den försvinner.
        let deletedUser = this.getUser(id);
        this.members = this.members.filter(member => {
            // returnera alla members utan den selected id
            if (member.id !== id) {
                return member;
            }
        })
        return deletedUser;
    }
}
module.exports = { Users }