import { useUIStore } from "@/hooks";
import { observer } from "mobx-react";
import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { useHistory, useLocation } from "react-router-dom";
import './Tags.scss'

const Tags: React.FC = observer(() => {
    const location = useLocation();
    const history = useHistory();
    const uiStore = useUIStore();

    const { tags: tagList } = uiStore;

    const handChangeTag = (activeKey: any) => {
        if (location.pathname === activeKey)
            return;
        history.push(activeKey);
    }
    const handRemoveTag = (e: React.MouseEvent<HTMLElement, MouseEvent>, targetKey: any) => {
        e.stopPropagation();
        // 删除页签
        if (location.pathname === targetKey) {
            tagList.forEach(() => {
                uiStore.removeTag(targetKey);
                if (targetKey === tagList[tagList.length - 1].path) {
                    // 当前页签在最后,删除之后则路由跳转到前一个页签
                    history.replace(tagList[tagList.length - 2].path);
                } else {
                    // 当页页签不是在最后,删除之后则跳转到最后去
                    history.replace(tagList[tagList.length - 1].path);
                }
            });
        } else {
            debugger
            uiStore.removeTag(targetKey);
        }
    }
    return (
        <div className="tags">
            <div className="tags-scroll">
                <Scrollbars style={{ width: '100%', height: 45 }} autoHide universal={true}>
                    <ul className="tags-list">
                        {tagList.map((item, index) => (
                            <li key={item.path}
                                className={location.pathname === item.path ? 'isActive' : ''}
                                onClick={() => handChangeTag(item.path)}>
                                <span>{item.title}</span>
                                <em onClick={e => handRemoveTag(e, item.path)} className={index === 0 ? 'hide' : ''}>
                                    &times;
                                </em>
                            </li>
                        ))}
                    </ul>
                </Scrollbars>
            </div>
        </div>
    );
})
export default Tags