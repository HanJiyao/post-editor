import React, { Component } from 'react';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostEditor from './Editor'

const style = {
    headerWrapper:{
        height: '90px',
        fontSize: '2rem',
        background: '#1E88E5',
        color: 'white'
    },
    postHeader:{
        maxWidth: '900px',
        padding: '20px',
        margin: 'auto'
    },
    urlLink: {
        display: 'inline-block',
        paddingTp: '10px',
        paddingBottom: '5px',
    }
}

class EditorPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Daily Record",
            category: "Blog",
            template: "Default",
            author: "Han Jiyao",
            tag: "Lifestyle",
            created: "2018-06-06",
            language: "English",
            sourceHTML:"<p>Hey this <strong>editor</strong> rocks 😀</p>"
        };
        this.EditorSubmit = this.EditorSubmit.bind(this);
    }

    EditorSubmit = (e) => {
        
        this.setState({
            /*
            name: e.name,
            category: e.category,
            template: e.template,
            author: e.author,
            tag: e.tag,
            created: e.created,
            language: e.language,
            sourceHTML: e.sourceHTML
            */
        });
        
       console.log('Successful save: '+ e.state)
    }

    render(){
        return(
            <div>
                <div style={style.headerWrapper}>
                    <div style={style.postHeader}>
                        <div style={style.urlLink}>
                            <span role="img" aria-label="link"> 🔗 </span>
                        </div>
                        <div style={style.urlLink}>
                            <div id="postTitle"> Sample Post </div>
                        </div>
                    </div>
                </div>
                < PostEditor 
                    name={this.state.name}
                    category={this.state.category}
                    template={this.state.template}
                    author={this.state.author}
                    tag={this.state.tag}
                    created={this.state.created}
                    language={this.state.language}
                    sourceHTML={this.state.sourceHTML}
                    EditorSubmit={this.EditorSubmit}
                />
            </div>
        )
    }
}

export default EditorPage;