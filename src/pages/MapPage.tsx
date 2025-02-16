import {
  CafeIcon,
  GlobalIcon,
  ListIcon,
  StarIcon,
  BottomArrowIcon,
  FoodIcon,
  CameraIcon2,
  MapBlackIcon,
  FoodFilledIcon,
  CameraFilledIcon,
  CafeFilledIcon,
  BigLocationIcon,
  TopArrowIcon,
} from '@/utils/icons';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import CustomMap from '@/components/customMap/CustomMap';
import { useNavigate } from 'react-router-dom';
// import { Cookies } from 'react-cookie';
import { checkAuthStatus, getUserInfo } from '@/api/auth';
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '@/store/AuthState';
import SkeletonMap from '@/components/skeleton/SkeletonMap';

const MapPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [clickedKind, setClickedKind] = useState<string | null>(null);
  const [selectedLatitude, setSelectedLatitude] = useState<number | null>(null);
  const [selectedLongitude, setSelectedLongitude] = useState<number | null>(
    null,
  );
  const navigate = useNavigate();
  // const cookie = new Cookies();
  const [selectedArea, setSelectedArea] = useState('서울특별시');
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  // 스켈레톤 UI
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      const authStatus = await checkAuthStatus();
      setIsLoggedIn(authStatus.isLoggedIn);
    };

    initializeAuth();
  }, []);

  // 유저정보
  const { isSuccess } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    enabled: isLoggedIn,
  });

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess, navigate]);

  // 선택한 지역으로 이동
  const handleSelectArea = (areaName: string) => {
    setSelectedArea(areaName);
    setShowDropdown(false);

    const selectedDistrict = seoulDistricts.find(
      (district) => district.name === areaName,
    );
    if (selectedDistrict) {
      setSelectedLatitude(selectedDistrict.latitude);
      setSelectedLongitude(selectedDistrict.longitude);
    } else {
      setSelectedLatitude(null);
      setSelectedLongitude(null);
    }
  };

  const handleKindClick = (kind: string) => {
    setClickedKind(clickedKind === kind ? null : kind);
  };

  const seoulDistricts = [
    { name: '서울특별시', latitude: 37.555949, longitude: 126.972309 },
    { name: '서울특별시 강남구', latitude: 37.5172, longitude: 127.0473 },
    { name: '서울특별시 강동구', latitude: 37.5301, longitude: 127.1238 },
    { name: '서울특별시 강북구', latitude: 37.6396, longitude: 127.0257 },
    { name: '서울특별시 강서구', latitude: 37.5509, longitude: 126.8497 },
    { name: '서울특별시 관악구', latitude: 37.4784, longitude: 126.9516 },
    { name: '서울특별시 광진구', latitude: 37.5385, longitude: 127.0823 },
    { name: '서울특별시 구로구', latitude: 37.4954, longitude: 126.8874 },
    { name: '서울특별시 금천구', latitude: 37.4568, longitude: 126.8954 },
    { name: '서울특별시 노원구', latitude: 37.6542, longitude: 127.0568 },
    { name: '서울특별시 도봉구', latitude: 37.6688, longitude: 127.0471 },
    { name: '서울특별시 동대문구', latitude: 37.5744, longitude: 127.0403 },
    { name: '서울특별시 동작구', latitude: 37.5124, longitude: 126.9393 },
    { name: '서울특별시 마포구', latitude: 37.5663, longitude: 126.9014 },
    { name: '서울특별시 서대문구', latitude: 37.5791, longitude: 126.9368 },
    { name: '서울특별시 서초구', latitude: 37.4837, longitude: 127.0324 },
    { name: '서울특별시 성동구', latitude: 37.5633, longitude: 127.0371 },
    { name: '서울특별시 성북구', latitude: 37.5891, longitude: 127.0166 },
    { name: '서울특별시 송파구', latitude: 37.5145, longitude: 127.1066 },
    { name: '서울특별시 양천구', latitude: 37.5169, longitude: 126.8664 },
    { name: '서울특별시 영등포구', latitude: 37.5264, longitude: 126.8962 },
    { name: '서울특별시 용산구', latitude: 37.5326, longitude: 126.9909 },
    { name: '서울특별시 은평구', latitude: 37.6027, longitude: 126.9291 },
    { name: '서울특별시 종로구', latitude: 37.573, longitude: 126.9794 },
    { name: '서울특별시 중구', latitude: 37.5638, longitude: 126.9976 },
    { name: '서울특별시 중랑구', latitude: 37.6066, longitude: 127.0928 },
  ];

  return (
    <Layout>
      <CategoryBox>
        <SecondHeader>
          <AreaBox onClick={toggleDropdown}>
            <BigLocationIcon />
            &nbsp; {selectedArea}&nbsp;
            {showDropdown ? <TopArrowIcon /> : <BottomArrowIcon />}
            {showDropdown && (
              <DropdownMenu>
                {seoulDistricts.map((area) => (
                  <DropdownItem
                    key={area.name}
                    onClick={() => handleSelectArea(area.name)}
                  >
                    {area.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            )}
          </AreaBox>

          <ThreeKindBox>
            <KindBox
              kind="FOOD"
              $isSelected={clickedKind === 'FOOD'}
              onClick={() => handleKindClick('FOOD')}
            >
              {clickedKind === 'FOOD' ? <FoodIcon /> : <FoodFilledIcon />}
              &nbsp;맛집
            </KindBox>
            <KindBox
              kind="CAFE"
              $isSelected={clickedKind === 'CAFE'}
              onClick={() => handleKindClick('CAFE')}
            >
              {clickedKind === 'CAFE' ? <CafeIcon /> : <CafeFilledIcon />}
              &nbsp;카페
            </KindBox>
            <KindBox
              kind="PHOTOZONE"
              $isSelected={clickedKind === 'PHOTOZONE'}
              onClick={() => handleKindClick('PHOTOZONE')}
            >
              {clickedKind === 'PHOTOZONE' ? (
                <CameraIcon2 />
              ) : (
                <CameraFilledIcon />
              )}
              &nbsp;사진스팟
            </KindBox>
          </ThreeKindBox>

          <FourComponentBox>
            <FourCategory>
              <MapBlackIcon />
              <SelectedPageComment>&nbsp;지도</SelectedPageComment>
            </FourCategory>
            <FourCategory onClick={() => navigate('/listpage')}>
              <ListIcon />
              &nbsp;리스트
            </FourCategory>
            <FourCategory onClick={() => navigate('/scorepage')}>
              <GlobalIcon />
              &nbsp;동네별 활동점수
            </FourCategory>
            <FourCategory onClick={() => navigate('/newspage')}>
              <StarIcon />
              &nbsp;동네소식
            </FourCategory>
          </FourComponentBox>
        </SecondHeader>
      </CategoryBox>
      {isLoading && <SkeletonMap />}
      <CustomMap
        width="100%"
        height="811px"
        clickedCategory={clickedKind}
        selectedDistrict={selectedArea}
        selectedLatitude={selectedLatitude}
        selectedLongitude={selectedLongitude}
      />
    </Layout>
  );
};

const SecondHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1280px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 45px;
  left: 0;
  background-color: #fff;
  border-radius: 5px;
  width: 167px;
  height: 180px;
  overflow-y: auto;
  z-index: 400;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);

  &::-webkit-scrollbar {
    width: 6px;
    height: 20px;
  }

  &::-webkit-scrollbar-track {
    background-color: white;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: gray;
  }
`;

const DropdownItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

const Layout = styled.div`
  padding-top: 111px;
`;

const AreaBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-width: 180px;
  margin: 0 10px 0 20px;
  cursor: pointer;
`;

const CategoryBox = styled.div`
  position: fixed;
  top: 61.25px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-evenly;
  background-color: white;
  height: 65px;
  z-index: 9;
`;

const ThreeKindBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
`;

const KindBox = styled.div<{ $isSelected?: boolean; kind: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  padding: 6px 9px;
  width: ${(props) => {
    return props.kind == 'PHOTOZONE' ? '84px' : '60px';
  }};
  background-color: ${(props) => {
    if (!props.$isSelected) {
      return 'none';
    } else if (props.kind == 'FOOD') {
      return '#FE6847';
    } else if (props.kind == 'CAFE') {
      return '#9BCF53';
    } else if (props.kind == 'PHOTOZONE') {
      return '#00A3FF';
    }
  }};
  color: ${(props) => (props.$isSelected ? 'white' : 'none')};
  border: none;
  border-radius: 300px;
  box-shadow: 0px 0px 5px #d8d8d8;
  font-size: 14px;
  cursor: pointer;
`;

const FourComponentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 392px;
  cursor: pointer;
`;

const FourCategory = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  color: #a1a1a1;
  font-weight: bold;
  cursor: pointer;
`;

const SelectedPageComment = styled.div`
  color: black;
`;

export default MapPage;
