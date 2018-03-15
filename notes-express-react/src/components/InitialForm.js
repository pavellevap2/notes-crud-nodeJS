import React from "react";

class InitialForm extends React.Component{
    constructor(props){
     super(props);
    }
    render(){
        return(
            <div>
                <form method="post" action="/register">
                    Email Address:<br/>
                    <input type="text" name="email"/><br/>
                    Username:<br/>
                    <input type="text" name="username"/><br/>
                    Password:<br/>
                    <input type="password" name="password"/><br/>
                    <input type="submit" value="Register"/>
                </form>
            </div>
        )
    }
}
export default InitialForm;