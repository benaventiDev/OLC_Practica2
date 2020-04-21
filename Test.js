



class User{
    constructor(email, name) {
        this.email = email;
        this.name = name;
        this.score = 0;
    }

    login(){
        console.log(this.email, 'just logged in');
    }
    logout(){
        coonsole.log(this.email, 'just logged out');
        return this;
    }
    updateScore(){
        this.score++;
        console.log(this.email, 'score is now', this.score);
        return this;
    }
}

function  User(email, name) {
    this.email = email;
    this.name = name;
    this.online = false;

}

User.prototype.login = function () {
    this.online = true;
    console.log(this.email, 'has logged in');
}

User.prototype.logout = function () {
    this.online = true;
    console.log(this.email, 'has logged logout');
}



function Admin(...args){
    User.apply(this, args);
    this.role = 'super admin';
}

Admin.prototype.deleteUser = function(u){
        users = users.filter(user => {
            return user.email !== u.email;
        })

}

Admin.prototype = Object.create(User.prototype);
var users = [userOne, userTwo, admin];


