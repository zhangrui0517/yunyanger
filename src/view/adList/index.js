import React, {Component} from 'react';
import {Button} from 'antd';
import AdCardSingle from '../adCardSingle';
class AdListUI extends Component {
    constructor(props) {
        super(props);
        let title_name = {
            'wait_cat':'待领养猫咪',
            'wait_dog':'待领养狗狗',
            'luck_cat':'已领养猫咪',
            'luck_dog':'已领养狗狗'
        }
        let type_pathname = props
            .match
            .path
            .split('/')[1];
        let type = {
            'wait_cat': {
                ad_type: '猫',
                ad_status: false
            },
            'wait_dog': {
                ad_type: '狗',
                ad_status: false
            },
            'luck_cat': {
                ad_type: '猫',
                ad_status: true
            },
            'luck_dog': {
                ad_type: '狗',
                ad_status: true
            }
        }
        this.title = title_name[type_pathname];
        this.params = type[type_pathname];
        this.page = 0;
        this.load_more = false;
        this.first_load = true;
    }
    componentDidMount() {
        this
            .props
            .getListDate(this.page,this.params);
    }
    shouldComponentUpdate(nextProps){
        if(this.props.dataSource.length>nextProps.dataSource.length){
            return true;
        }
        if(this.first_load){
            this.first_load = false;
            this.load_more = (nextProps.dataSource.length/10).toString().indexOf('.')<0?true:false;
            this.load_more?++this.page:false;
            return true;
        }else{
            this.load_more = 
                this.props.dataSource.length < nextProps.dataSource.length 
                && 
                (nextProps.dataSource.length/10).toString().indexOf('.')<0
                ?true:false;
            this.load_more?++this.page:false;
            return true;
        }
    }
    componentWillUnmount() {
        this
            .props
            .unmountDeleteData();
    }
    render() {
        document.title = `深圳领养之家—${this.title}`;
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        let data = this.props.dataSource
            ? this.props.dataSource
            : [];
        return (
            <div className="ad_list_wrap">
                <ul className="ad_list">
                    {
                        data.map((item) => {
                            return (
                                <li className="ad_list_item" key={item._id}>
                                    <AdCardSingle data={item}/>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="list_footer">
                    {
                        this.load_more?(
                            <Button type="primary" onClick={()=>{
                                this.props.getListDate(this.page,this.params)
                            }}>加载更多</Button>
                        ):(
                            <p>没有更多了...</p>
                        )
                    }
                </div>
            </div>
        )
    }
}
export default AdListUI;