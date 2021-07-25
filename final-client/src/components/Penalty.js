import React, {Component} from "react";
import {Checkbox, Typography, Input, Button} from "antd";
import {connect} from "react-redux";

const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Early return', 'Late return', 'Refuel', 'Lost key', 'Damages'];
const {TextArea} = Input;

class Penalty extends Component{

    state = {
        penalties: [],
        indeterminate: true,
        checkAll: false,
        isNone : false,
        descriptions: '',
    };

    onChange = checkedList => {
        this.setState({
            penalties: checkedList,
            indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
            checkAll: checkedList.length === plainOptions.length,
        });
        if(this.state.penalties !== []){
            this.setState({
                isNone: false,
            });
        }

    };

    onCheckAllChange = e => {
        this.setState({
            penalties: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    };
    onNoneChange = (value) =>{
        if(value.target.checked === true){
            this.setState({
                penalties: [],
            });
        }
        this.setState({
            isNone: value.target.checked
        })
    }

    getDamagesDescriptions = ({ target: { value } }) =>{
        //console.log(value)
        // this.setState({
        //     descriptions
        // })
        this.setState({ descriptions: value });
    }

    getTotal = () =>{
        let list = [];
        this.props.penalties.forEach(p=>{
            //console.log(p);
            if(this.state.penalties.includes(p.name)){
                list.push(p);
            }
        })
        let penalties = {
            penalties: list,
            descriptions: this.state.descriptions
        }
        this.props.callback(penalties);
        //console.log('in penalty component',penalties)
    }
    goback = () =>{
        this.props.callback('back');
    }

    render(){
        const { descriptions } = this.state;
        return(
            <div style={{margin:'20px', padding: '10px'}}>
                <div style={{borderBottom: '1px solid #e9e9e9'}}>
                    <Checkbox
                        indeterminate={this.state.indeterminate}
                        onChange={this.onCheckAllChange}
                        checked={this.state.checkAll}
                    >
                        Check all
                    </Checkbox>
                </div>
                <br />
                <CheckboxGroup
                    options={plainOptions}
                    value={this.state.penalties}
                    onChange={this.onChange}
                />
                <Checkbox
                    onChange={this.onNoneChange}
                    checked={this.state.isNone}
                >None</Checkbox>
                {this.state.penalties.includes("Damages") && (
                    <Typography>
                        Description of damage:
                        <TextArea
                            value={descriptions}
                            placeholder="Describe the damages"
                            autoSize={{ minRows: 2, maxRows: 6 }}
                            onChange={this.getDamagesDescriptions}
                            maxLength={50}
                        />
                    </Typography>
                )}
                <div>
                    <Button onClick={this.goback}>Back</Button>
                    <Button onClick={this.getTotal}>Next</Button>
                </div>


            </div>
        );
    }

}

function mapStateToProps({penalties}){
    return {penalties};
}
export default connect(mapStateToProps)(Penalty);
