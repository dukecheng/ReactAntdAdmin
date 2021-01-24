import React, { } from 'react';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/font_2343771_edythimws3e.js', // icon-set icon-home icon-usercenter
        '//at.alicdn.com/t/font_2343771_phce2dke40s.js', // icon-shoppingcart, icon-python
    ],
});

const MenuIcon = (props: any) => {
    return props.name ? <IconFont type={'icon-' + props.name} /> : null
}
export default MenuIcon;