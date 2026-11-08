// 아이템 상세(54): 새 마이 화면 위에 아이템 시트가 올라온 상태. 내용은 MyHome.jsx의 ItemSheet.
import React from 'react';
import MyHome, { pickedItem } from './MyHome.jsx';

export default function MyItem() {
  return <MyHome item={pickedItem()} />;
}
