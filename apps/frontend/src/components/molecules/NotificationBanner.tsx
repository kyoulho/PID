const NotificationBanner = () => {
  return (
    <div className="bg-purple-200 text-purple-900 p-4 rounded-lg shadow-md my-4 relative">
      <p className="font-bold">관리자 김성우님 반갑습니다!</p>
      <p className="text-sm">
        ODD의 관리자 페이지에서는 재고 관리, 상품 관리, 전체 회원 관리 등 다양한
        기능을 제공합니다.
      </p>
      <button className="absolute top-2 right-2">✕</button>
    </div>
  );
};

export default NotificationBanner;
