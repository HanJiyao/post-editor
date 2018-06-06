import React, { Component } from 'react';
import {
    EditorState,
    convertToRaw,
    ContentState
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import Textarea from "react-textarea-autosize";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const style = {
    editorWrapper:{
        maxWidth: '900px',
        background: 'white',
        padding: '20px',
        margin: 'auto',
        minHeight: '600px',
        boxShadow: '0 0 15px #DDD',
        marginTop: '50px'
    },
    editorHeader:{
        padding: '30px',
        color: '#333333'
    },
    input: {
        width: '100%',
        border: '#DDD thin solid',
        borderRadius: '3px',
        padding: '5px',
        marginTop: '8px'
    },
    postToolBar:{
        padding: '30px',
        borderBottom: '#DDD solid thin'
    },
    editorText: {
        padding: '30px',
        color: 'black',
        minHeight: '300px'
    },
    editorBottom:{
        padding:'30px',
        textAlign: 'left',
        borderTop: '#DDD solid thin',
    },
    htmlSourceTextarea:{
        background: 'white',
        width: '100%',
        border: 'none',
        height: '100%',
        overflow: 'auto',
        outline: 'none',
        padding: '0',
        WebkitBoxShadow: 'none',
        MozBoxShadow: 'none',
        boxShadow: 'none'
    },
    htmlSource: {
        minHeight: '300px',
        padding: '10px'
    },
    viewEditor:{
        minHeight: '300px',
        padding:'10px'
    },
    editSubmit: {
        width: '100%'
    }
}
class PostEditor extends Component {
    constructor(props) {
        super(props);
        var html = this.props.sourceHTML;
        var contentBlock = htmlToDraft(html);
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.state = {
            editor: editorState,
            sourceActive: false,
            sourceHTML: html,
            name: this.props.name,
            category: this.props.category,
            template: this.props.template,
            author: this.props.author,
            tag: this.props.tag,
            created: this.props.created,
            language: this.props.language 
        };

        this.toggleClass = this.toggleClass.bind(this);
        this.updateSource = this.updateSource.bind(this);
        this.updateState = this.updateState.bind(this);
        this.updateName = this.updateName.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.updateTemplate = this.updateTemplate.bind(this);
        this.updateAuthor= this.updateAuthor.bind(this);
        this.updateTag = this.updateTag.bind(this);
        this.updateCreated = this.updateCreated.bind(this);
        this.updateLanguage = this.updateLanguage.bind(this);
        this.localStorageSubmit = this.localStorageSubmit.bind(this);
    }

    toggleClass() {
        this.setState({ sourceActive: !this.state.sourceActive });
        this.updateState();
    };

    onEditorStateChange = (editorState) => {
        this.setState({
            editor: editorState,
            sourceHTML: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        });
    };

    updateSource = (e) => {
        this.setState({
            sourceHTML: e.target.value,
        });
    }

    updateState() {
        var contentBlock = htmlToDraft(this.state.sourceHTML);
        var contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        var editorState = EditorState.createWithContent(contentState);
        this.setState({
            editor: editorState,
        });
    }
    
    updateName = (e)=>{
        this.setState({
            name: e.target.value,
        });
    }

    updateCategory = (e) => {
        this.setState({
            category: e.target.value,
        });
    }

    updateTemplate = (e) => {
        this.setState({
            template: e.target.value,
        });
    }

    updateAuthor = (e) => {
        this.setState({
            author: e.target.value,
        });
    }

    updateTag = (e) => {
        this.setState({
            tag: e.target.value,
        });
    }

    updateCreated = (e) => {
        this.setState({
            created: e.target.value,
        });
    }

    updateLanguage = (e) => {
        this.setState({
            language: e.target.value,
        });
    }

    localStorageSubmit(){
        localStorage.setItem('Source', JSON.stringify(this.state.sourceHTML));
        localStorage.setItem('Name', JSON.stringify(this.state.name));
        localStorage.setItem('Category', JSON.stringify(this.state.category));
        localStorage.setItem('Template', JSON.stringify(this.state.template));
        localStorage.setItem('Author', JSON.stringify(this.state.author));
        localStorage.setItem('Tag', JSON.stringify(this.state.tag));
        localStorage.setItem('Created', JSON.stringify(this.state.created));
        localStorage.setItem('Language', JSON.stringify(this.state.language));
    }

    render() {
        return (
            <div style={style.editorWrapper}>
                <div style={style.editorHeader} className="container">
                    <div className="row">
                        <div className="col-sm-3 input-group">
                            <div>Name</div>
                            <input style={style.input} type="text" value={this.state.name} onChange={this.updateName}/>
                        </div>
                        <div className="col-sm-3">
                            <div>Category</div>
                            <input style={style.input} type="text" value={this.state.category} onChange={this.updateCategory}/>
                        </div>
                        <div className="col-sm-3">
                            <div>Template</div>
                            <input style={style.input} type="text" value={this.state.template} onChange={this.updateTemplate}/>
                        </div>
                        <div className="col-sm-3">
                            <div>Author</div>
                            <input style={style.input} type="text" value={this.state.author} onChange={this.updateAuthor}/>
                        </div>
                    </div>
                </div>
                <div style={style.postToolBar} className="container text-right">
                    <div className="row">
                        <div className="col-12">
                            <div id="post-switch">
                                <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                    <label id="viewBtn"
                                        className={this.state.sourceActive ? 'btn btn-outline-primary' : 'btn btn-outline-primary active'}
                                        onClick={this.toggleClass}>
                                        View
                                    </label>
                                    <label id="htmlBtn"
                                        className={this.state.sourceActive ? 'btn btn-outline-primary active' : 'btn btn-outline-primary'}
                                        onClick={this.toggleClass}>
                                        HTML
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={style.editorText} className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className={this.state.sourceActive ? 'd-inline' : 'd-none'}>
                                <div id="htmlSource" style={style.htmlSource}>
                                    <Textarea
                                        value={this.state.sourceHTML}
                                        onChange={this.updateSource}
                                        style={style.htmlSourceTextarea}
                                    />
                                </div>
                            </div>

                            <div className={this.state.sourceActive ? 'd-none' : 'd-inline'}>
                                <div id="viewEditor" style={style.viewEditor}>
                                    <Editor
                                        editorState={this.state.editor}
                                        onEditorStateChange={this.onEditorStateChange}
                                        onFocus={this.updateState}
                                        onBlur={this.updateState}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={style.editorBottom} className="container pt-5">
                    <div className="row">
                        <div className="tag col-sm-6">
                            <div>Tag</div>
                            <input style={style.input} type="text" value={this.state.tag} onChange={this.updateTag}/>
                        </div>
                        <div className="created col-sm-3">
                            <div>Created</div>
                            <input style={style.input} type="date" value={this.state.created} onChange={this.updateCreated}/>
                        </div>
                        <div className="language col-sm-3">
                            <div>Language</div>
                            <select style={style.input} className="custom-select mt-2" value={this.state.language} onChange={this.updateLanguage}>
                                <option value="English">English</option>
                                <option value="Chinese">Chinese</option>
                                <option value="Malay">Malay</option>
                                <option value="Tmail">Tamil</option>
                            </select>
                        </div>
                    </div>
                    <div className="submit-group pt-5 row">
                        <div className="col-sm-6">
                            <button id="editSubmit" type="button" className="btn btn-primary btn-lg mb-3" 
                                style={style.editSubmit} 
                                onClick={this.localStorageSubmit}>Submit
                            </button>
                        </div>
                        <div className="col-sm-3">
                            <button id="editCancel" type="button" className="btn btn-outline-secondary btn-lg mb-3" style={style.editSubmit}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        
        )

    }
}

export default PostEditor;