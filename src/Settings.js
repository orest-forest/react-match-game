import React, {Component} from 'react';
import {useState} from 'react'
import Game from "./Game";
import './app.css';

export default class Settings extends Component {

    state = {
        countOfMatches: 25,
        countOfTake: 3,
        settings: null,
        incorectValue: false
    };

    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    changeSettings = () => {
        this.setState({
            settings: null,
            countOfMatches: 25,
            countOfTake: 3,
        })
    };

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.countOfMatches % 2 === 1 && this.state.countOfMatches > 0) {
            this.setState({
                settings: 'users',
                countOfTake: new Array(+this.state.countOfTake),
                incorectValue: false,
            });
        } else {
            this.setState({
                incorectValue: true
            })
        }
    };

    render() {
        return (
            <div className='App'>

                {this.state.settings ? <Game data={this.state} callback={this.changeSettings}/> :
                    <div className='App'>
                        <h3>Настройки игры</h3>
                        <form onSubmit={this.handleSubmit} className='settings-form'>
                            <h3>Количество спичек</h3>
                            <input onChange={this.handleChange} name='countOfMatches'
                                   value={this.state.countOfMatches}
                                   className={this.state.incorectValue ? 'settings-input-false' : 'settings-input'}
                                   type='number' min="0" max="999"
                            />
                            <h3>Сколько спичек можно брать</h3>
                            <input onChange={this.handleChange} name='countOfTake'
                                   value={this.state.countOfTake}
                                   type='number' min="1" max={this.state.countOfMatches}
                            />
                            <input type='submit'
                                   className='settings-submit'
                                   value='Начать игру'/>
                        </form>
                    </div>
                }
            </div>
        )
    }
}