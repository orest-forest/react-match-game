import React, {Component} from 'react';
import './app.css'

export default class Game extends Component {

    state = {
        matches: +this.props.data.countOfMatches,
        matchesToTake: this.props.data.countOfTake.fill(''),
        playerCount: 0,
        botCount: 0,
        gameEnd: false,
        rainbowList: [],
        settings: this.props.data.settings,
        botTurn: false,
    };

    handleClick = async event => {
        await this.setState({
            matches: +this.state.matches - +event.target.value,
            playerCount: +this.state.playerCount + +event.target.value,
            gameEnd: false
        });
        if (this.state.gameEnd === false) {
            this.botAi()
        }
    };

    botAi = () => {
        this.setState({
            botTurn: true,
        })
        setTimeout(() => {
            if (this.state.matches <= this.state.matchesToTake.length) {
                let i = Math.floor(Math.random() * (this.state.matches - 1) + 1);
                this.setState({
                    botTurn: false,
                    matches: +this.state.matches - i,
                    botCount: +this.state.botCount + i,
                });
            } else {
                let i = Math.floor(Math.random() * (this.state.matchesToTake.length - 1) + 1);
                this.setState({
                    botTurn: false,
                    matches: +this.state.matches - i,
                    botCount: +this.state.botCount + i,
                });
            }

        }, 200)


    };

    componentDidUpdate =  () => {
        setTimeout(() => {
        if (this.state.matches === 0) {
            if (this.state.playerCount % 2 === 0) {
                alert('Вы победили');
                this.setState({
                    matches: +this.props.data.countOfMatches,
                    playerCount: 0,
                    botCount: 0,
                    gameEnd: true
                });
            } else if (this.state.botCount % 2 === 0) {
                alert('Вы проиграли');
                this.setState({
                    matches: +this.props.data.countOfMatches,
                    playerCount: 0,
                    botCount: 0,
                    gameEnd: true
                });
            }
        }}, 200)
    };


    render() {
        const matchList = new Array(this.state.matches);
        matchList.fill('\uD83D\uDE00', 0, this.state.matches);

        const playerList = new Array(this.state.playerCount);
        playerList.fill('\uD83D\uDE00', 0, this.state.playerCount);

        const botList = new Array(this.state.botCount);
        botList.fill('\uD83D\uDE00', 0, this.state.botCount);

        const buttonList = this.state.matchesToTake.map((item, index) => {
            let i = index + 1;
            return <button onClick={this.handleClick} value={i} className='buttons' disabled={this.state.matches < i || this.state.botTurn}>{i}</button>
        });

        return (
            <>
                <div className='App'>
                    <h3>Количество оставшихся спичек: {this.state.matches}</h3>
                    <h3>{matchList}</h3>
                    <p>Сколько спичек вы хотите взять?</p>
                    <div className='buttons-list'>
                    {buttonList}
                    </div>
                    <div className='players-list'>
                        <div className='players-wrapper'>
                    <span>Ваш счет: {this.state.playerCount}</span>
                        <p>{playerList}</p>
                        </div>
                        <div className='players-wrapper'>
                    <span>Счет противника: {this.state.botCount}</span>
                        <p>{botList}</p>
                    </div>
                    </div>
                    <button onClick={() => {
                        this.props.callback()
                    }}
                    className='settings-submit'
                    >Сменить настройки
                    </button>
                </div>
            </>
        )
    }
}