import React, { Component } from 'react';
import {
    EditorState,
    convertToRaw,
    ContentState
} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import Textarea from "react-textarea-autosize";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Editor.css';


class PostEditor extends Component {
    constructor(props) {
        super(props);
        var html = '<p>Hey this <strong>editor</strong> rocks 😀</p>';
        var contentBlock = htmlToDraft(html);
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        this.state = {
            editor: editorState,
            sourceActive: false,
            sourceHTML: html,
        };

        this.toggleClass = this.toggleClass.bind(this);
        this.updateSource = this.updateSource.bind(this);
        this.updateState = this.updateState.bind(this);

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

    render() {
        return (
            <div className="editor-master-wrapper">
                <div className="header-wrapper ">
                    <div className="post-header">
                        <div className="url-link">
                            < i className="material-icons" > link </i>
                        </div>
                        <div className="post-title">
                            <div id="postTitle">
                                Sample Post
                            </div>
                        </div>
                    </div>
                </div>
                <div className="editor-wrapper">
                    <div className="editor-header container">
                        <div className="row">
                            <div className="name col-sm-3 input-group">
                                <div>Name</div>
                                <input type="text" />
                            </div>
                            <div className="catagory col-sm-3">
                                <div>Catagory</div>
                                <input type="text" />
                            </div>
                            <div className="template col-sm-3">
                                <div>Template</div>
                                <input type="text" />
                            </div>
                            <div className="author col-sm-3">
                                <div>Author</div>
                                <input type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="post-tool-bar container text-right">
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
                    <div className="editor-text container">
                        <div className="row">
                            <div className="col-12">
                                <div className={this.state.sourceActive ? 'd-inline' : 'd-none'}>
                                    <div id="htmlSource">
                                        <Textarea
                                            value={this.state.sourceHTML}
                                            onChange={this.updateSource}
                                        />
                                    </div>
                                </div>

                                <div className={this.state.sourceActive ? 'd-none' : 'd-inline'}>
                                    <div id="viewEditor">
                                        <Editor
                                            editorState={this.state.editor}
                                            onEditorStateChange={this.onEditorStateChange}
                                            onFocus={this.updateState}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="editor-bottom container pt-5">
                        <div className="row">
                            <div className="tag col-sm-6">
                                <div>Tag</div>
                                <input type="text" />
                            </div>
                            <div className="created col-sm-3">
                                <div>Created</div>
                                <input type="date" />
                            </div>
                            <div className="language col-sm-3">
                                <div>Language</div>
                                <select className="custom-select mt-2">
                                    <option defaultValue>English</option>
                                    <option value="1">Chinese</option>
                                    <option value="2">Malay</option>
                                    <option value="3">Tamil</option>
                                </select>
                            </div>
                        </div>
                        <div className="submit-group pt-5 row">
                            <div className="col-sm-6">
                                <button id="editSubmit" type="button" className="btn btn-primary btn-lg mb-3">Submit</button>
                            </div>
                            <div className="col-sm-3">
                                <button id="editCancel" type="button" className="btn btn-outline-secondary btn-lg mb-3">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}

export default PostEditor;