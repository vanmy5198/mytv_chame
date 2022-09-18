import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthLoading from "../screens/AuthLoading";
import OnBoarding from "../screens/OnBoarding";
import MainScreen from "../screens/Main";
import InputPhone from "../screens/Login/InputPhone";
import InputCode from "../screens/Login/InputCode";
import Resend from "../screens/Login/Resend";
import Company from "../screens/About/Company";
import Policy from "../screens/About/Policy";
import Privacy from "../screens/About/Privacy";
// import UserInfo from '../screens/About/UserInfo';
import Contact from "../screens/About/Contact";
import ContactSent from "../screens/About/ContactSent";
import EditProfileScreen from "../screens/Profile/EditProfileScreen";
import FinishEditProfileScreen from "../screens/Profile/FinishEditProfileScreen";
// From home tab
import LifeLine from '../screens/Home/LifeLine';
import ContractInformation from '../screens/Home/ContractInformation';
import Q_AScreen from '../screens/Home/Q_AScreen';
import RoomArrange from '../screens/Home/RoomArrange';
import Trouble from '../screens/Home/TroubleCategory';
import WithLeon from '../screens/Home/WithLeon';
// check
import RoomCheckScreen from '../screens/Home/Check';
import CheckConfirm from '../screens/Home/Check/CheckConfirm';
// trouble pages start
import Water from '../screens/Home/TroubleCategory/Water';
import Key from '../screens/Home/TroubleCategory/Key';
import Gas from '../screens/Home/TroubleCategory/Gas';
import Toilet from '../screens/Home/TroubleCategory/Toilet';
import TV from '../screens/Home/TroubleCategory/TV';
import AirCondition from '../screens/Home/TroubleCategory/AirCondition';
import MailBox from '../screens/Home/TroubleCategory/MailBox';
import OtherFacility from '../screens/Home/TroubleCategory/OtherFacility';
import FacilityGuide from '../screens/Home/TroubleCategory/FacilityGuide';
import TroubleContact from '../screens/Home/TroubleCategory/TroubleContact';
import TroubleContactConfirm from '../screens/Home/TroubleCategory/TroubleContactConfirm';
// trouble pages end
import Bookmarks from '../screens/MenuPages/Bookmarks';
import Invite from '../screens/MenuPages/Invite';
import About from '../screens/MenuPages/About';
import CancelContract from '../screens/MenuPages/CancelContract';
import CancelContractForm from '../screens/MenuPages/CancelContractForm';
import CancelContractNote1 from '../screens/MenuPages/CancelContractNote1';
import CancelContractNote2 from '../screens/MenuPages/CancelContractNote2';
import CancelContractConfirm from '../screens/MenuPages/CancelContractConfirm';
import CancelContractPrecautions from '../screens/MenuPages/CancelContractPrecautions';
import PetForm from '../screens/MenuPages/PetForm';
import PetFormConfirm from '../screens/MenuPages/PetFormConfirm';
import KeyForm from '../screens/MenuPages/KeyForm';
import KeyFormConfirm from '../screens/MenuPages/KeyFormConfirm';
import WebView from '../screens/WebView';
import * as React from 'react';
import Colors from '../constants/Colors';
import Maps from '../screens/Home/Maps'
import ProfileContext from "../screens/Context/ProfileContext";

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();
const headerStyle = {
	headerTintColor: "#fff",
	headerStyle: { backgroundColor: Colors.primary },
};
function RootNavigator() {
	const profile = React.useState('');
	return (
		<ProfileContext.Provider value={profile}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ gestureEnabled: false, headerTintColor: '#fff', headerStyle: { backgroundColor: Colors.primary }, headerTitleAlign: 'center' }}>
					<Stack.Screen
						options={{ headerShown: false, headerStyle: { backgroundColor: Colors.white } }}
						name="AuthLoading"
						component={AuthLoading}
					/>
					<Stack.Screen options={{ headerShown: false, title: 'ウォークスルー' }} name="OnBoarding" component={OnBoarding} />
					<Stack.Screen
						options={{ title: '電話番号の確認', headerTintColor: Colors.primary, headerStyle: { backgroundColor: Colors.white } }}
						name="InputPhone"
						component={InputPhone}
					/>
					<Stack.Screen
						options={{ title: '認証番号の入力', headerTintColor: Colors.primary, headerBackTitle: '', headerStyle: { backgroundColor: Colors.white } }}
						name="InputCode"
						component={InputCode}
					/>
					<Stack.Screen options={{ title: '確認コードを再送' }} name="Resend" component={Resend} />
					<Stack.Screen options={{ title: '運営会社' }} name="Company" component={Company} />
					<Stack.Screen options={{ title: '利用規約' }} name="Policy" component={Policy} />
					{/* <Stack.Screen options={{ ...headerStyle, title: '個人情報の取扱い' }} name="UserInfo" component={UserInfo} /> */}
					<Stack.Screen options={{ title: 'プライバシーポリシー', headerBackTitle: '戻る' }} name="Privacy" component={Privacy} />
					<Stack.Screen options={{ title: 'お問い合わせ' }} name="Contact" component={Contact} />
					<Stack.Screen options={{ title: 'お問い合わせ完了' }} name="ContactSent" component={ContactSent} />
					<Stack.Screen options={{ headerShown: false, title: 'ホーム' }} name="Main" component={MainScreen} />
					<Stack.Screen options={({ route }) => ({ title: route.params.name })} name="WebView" component={WebView} />
					{/* Person's Information */}
					<Stack.Screen
						options={{
							title: "マイページ",
							headerTintColor: Colors.primary,
							headerBackTitle: "",
							headerStyle: { backgroundColor: Colors.white },
						}}
						name="EditProfileScreen"
						component={EditProfileScreen}
					/>
					<Stack.Screen
						options={{
							title: "chameLEON",
							headerTintColor: Colors.primary,
							headerBackTitle: "",
							headerStyle: { backgroundColor: Colors.white },
						}}
						name="FinishEditProfileScreen"
						component={FinishEditProfileScreen}
					/>
					{/* home pages */}
					<Stack.Screen options={{ title: 'chameLEON', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="Maps" component={Maps} />
					<Stack.Screen options={{ title: 'ライフライン手続き', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="LifeLine" component={LifeLine} />
					<Stack.Screen options={{ title: '契約情報のご確認', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="ContractInformation" component={ContractInformation} />
					<Stack.Screen options={{ title: 'よくある質問', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="Q_AScreen" component={Q_AScreen} />
					<Stack.Screen options={{ title: 'お引越しのご検討', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="WithLeon" component={WithLeon} />
					<Stack.Screen options={{ title: '入居時状況確認チェックシート', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="RoomCheckScreen" component={RoomCheckScreen} />
					<Stack.Screen options={{ title: 'チェックシートの確認', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="CheckConfirm" component={CheckConfirm} />
					<Stack.Screen options={{ title: '空き部屋・間取り', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="RoomArrange" component={RoomArrange} />
					<Stack.Screen options={{ title: 'トラブル箇所カテゴリー', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="Trouble" component={Trouble} />
					<Stack.Screen options={{ title: '水廻りのトラブル', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="Water" component={Water} />
					<Stack.Screen options={{ title: '鍵のトラブル', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="Key" component={Key} />
					<Stack.Screen options={{ title: 'ガスのトラブル', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="Gas" component={Gas} />
					<Stack.Screen options={{ title: 'トイレのトラブル', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="Toilet" component={Toilet} />
					<Stack.Screen options={{ title: 'テレビのトラブル', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="TV" component={TV} />
					<Stack.Screen options={{ title: 'エアコンのトラブル', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="AirCondition" component={AirCondition} />
					<Stack.Screen options={{ title: 'メールボックスのトラブル', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="MailBox" component={MailBox} />
					<Stack.Screen options={{ title: 'その他の設備のトラブル', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="OtherFacility" component={OtherFacility} />
					<Stack.Screen options={{ title: '設備の使い方', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="FacilityGuide" component={FacilityGuide} />
					<Stack.Screen options={{ title: '入居のしおり', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="Bookmarks" component={Bookmarks} />
					<Stack.Screen options={{ title: '家族招待', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="Invite" component={Invite} />
					<Stack.Screen options={{ title: 'このアプリについて', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="About" component={About} />
					<Stack.Screen options={{ title: '解約申請', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="CancelContract" component={CancelContract} />
					<Stack.Screen options={{ title: '解約申請フォーム', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="CancelContractForm" component={CancelContractForm} />
					<Stack.Screen options={{ title: '解約申請フォーム', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="CancelContractNote1" component={CancelContractNote1} />
					<Stack.Screen options={{ title: '解約申請フォーム', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="CancelContractNote2" component={CancelContractNote2} />
					<Stack.Screen options={{ title: '解約申請内容の確認', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="CancelContractConfirm" component={CancelContractConfirm} />
					<Stack.Screen options={{ title: '注意事項の確認', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="CancelContractPrecautions" component={CancelContractPrecautions} />
					<Stack.Screen options={{ title: 'ペット飼育仮申請', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="PetForm" component={PetForm} />
					<Stack.Screen options={{ title: 'ペット飼育申請の内容確認', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="PetFormConfirm" component={PetFormConfirm} />
					<Stack.Screen options={{ title: '鍵の追加申請フォーム', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="KeyForm" component={KeyForm} />
					<Stack.Screen options={{ title: '鍵の追加申請　内容確認', headerStyle: { backgroundColor: Colors.white }, headerTintColor: Colors.primary }} name="KeyFormConfirm" component={KeyFormConfirm} />
					<Stack.Screen options={{ title: '設備トラブルお問い合わせ', headerStyle: { backgroundColor: Colors.primary }, headerTintColor: Colors.white }} name="TroubleContact" component={TroubleContact} />
					<Stack.Screen options={{ title: '設備トラブルお問い合わせの確認', headerStyle: { backgroundColor: Colors.primary }, headerTintColor: Colors.white }} name="TroubleContactConfirm" component={TroubleContactConfirm} />
				</Stack.Navigator>
			</NavigationContainer>
		</ProfileContext.Provider>
	);
}

export default RootNavigator;
