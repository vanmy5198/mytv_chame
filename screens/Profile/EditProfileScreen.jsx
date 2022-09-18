import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import { Button } from "react-native-elements";
import Colors from "../../constants/Colors";
import RNPickerSelect from "react-native-picker-select";
import GlobalStyles from "../../styles/index";
import { validateEmail } from 'root/services/utils'
import axios from 'axios'
import ProfileContext from "../Context/ProfileContext";
import { CONTRACT_STATUS } from 'root/services/request'
import AsyncStorage from "@react-native-async-storage/async-storage"

const { width, height } = Dimensions.get("window");

export default function EditProfileScreen({ navigation }) {
  var [name, onNameChange] = useState("");
  var [name_kana, onNameKanaChange] = useState("");
  const [category] = useContext(ProfileContext);
  var [contract_type, onContractChange] = useState(category);
  var [article, onArticleChange] = useState("")
  var [room_number, onRoomNumberChange] = useState("")
  var [phone, onPhoneChange] = useState("");
  var [fax, onFaxChange] = useState("");
  var [corp_resident, onCorpResidentChange] = useState("");
  var [corp_resident_kana, onCorpResidentKanaChange] = useState("")
  var [corp_address, onCorpAddressChange] = useState("");
  var [mail, onMailChange] = useState("");
  var [gender, onGenderChange] = useState("");
  var [year, onYearChange] = useState("");
  var [month, onMonthChange] = useState("");
  var [day, onDayChange] = useState("");

  const [value, onChangeText] = useState("");
  const [error, setError] = useState({
    name: "",
    name_katakana: "",
    contract_type: "",
    article: "",
    room_number: "",
    phone: "",
    fax: "",
    corp_resident: "",
    corp_resident_katakana: "",
    corp_address: "",
    mail: "",
    gender: "",
    year: "",
    month: "",
    day: "",
  });
  const listYears = range(1900, 2035).map((item, index) => ({
    label: "" + item,
    value: "" + item,
  }));

  const listMonths = range(1, 12).map((item, index) => ({
    label: "" + item,
    value: "" + item,
  }));

  const [listDays, setListDays] = useState(
    range(1, 31).map((item, index) => ({
      label: "" + item,
      value: "" + item,
    }))
  );


  useEffect(() => {
    let val_user_phone = phone
    let val_user_fax = fax
    let val_corp_address = corp_address
    let isDirty = false

    let phone_format = val_user_phone.trim().split('-').join('');
    let corp_address_format = val_corp_address.trim().split('-').join('');


    if (phone_format.length === 11) {
      val_user_phone = phone_format.substring(0, 3) + '-' + phone_format.substring(3, 7) + '-' + phone_format.substring(7)
      isDirty = true
    } else if (phone_format.length === 10) {
      val_user_phone = phone_format.substring(0, 2) + '-' + phone_format.substring(2, 6) + '-' + phone_format.substring(6)
      isDirty = true
    }

    if (corp_address_format.length === 11) {
      val_corp_address = corp_address_format.substring(0, 3) + '-' + corp_address_format.substring(3, 7) + '-' + corp_address_format.substring(7)
      isDirty = true
    } else if (corp_address_format.length === 10) {
      val_corp_address = corp_address_format.substring(0, 2) + '-' + corp_address_format.substring(2, 6) + '-' + corp_address_format.substring(6)
      isDirty = true
    }

    if (val_user_fax.length >= 4 && val_user_fax[3] !== '-') {
      val_user_fax = val_user_fax.substring(0, 3) + '-' + val_user_fax.substring(3)
      isDirty = true
    }
    if (val_user_fax.length >= 9 && val_user_fax[8] !== '-') {
      val_user_fax = val_user_fax.substring(0, 8) + '-' + val_user_fax.substring(8)
      isDirty = true
    }

    if (isDirty) {
      val_user_phone = val_user_phone.substring(0, 13)
      onPhoneChange(val_user_phone)

      val_corp_address = val_corp_address.substring(0, 13)
      onCorpAddressChange(val_corp_address)

      val_user_fax = val_user_fax.substring(0, 13)
      onFaxChange(val_user_fax)
    }


  }, [phone, corp_address, fax])


  const updatePhone = (val) => {
    if (val.length > 13) return
    onPhoneChange(val)
  }

  const updateFax = (val) => {
    if (val.length > 13) return
    onFaxChange(val)
  }

  const updateCorpAddress = (val) => {
    if (val.length > 13) return
    onCorpAddressChange(val)
  }

  const handleTextChange = (text, fromField) => {
    onChangeText({ [fromField]: text });
  };

  const checkText = () => {
    let check = true;
    if (!name) {
      setError((val) => ({ ...val, name: "お名前を入力してください。" }));
      check = false;
    } else {
      setError((val) => ({ ...val, name: "" }));
    }
    if (!name_kana) {
      setError((val) => ({
        ...val,
        name_katakana: "お名前を入力してください。",
      }));
      check = false;
    } else {
      setError((val) => ({ ...val, name_katakana: "" }));
    }
    if (!contract_type) {
      setError((val) => ({
        ...val,
        contract_type: "選んでください。",
      }));
      check = false;
    } else {
      setError((val) => ({ ...val, contract_type: "" }));
    }
    if (!phone) {
      setError((val) => ({
        ...val,
        phone: "入力してください。",
      }));
      check = false;
    }
    else if (phone.length < 12) {
      setError(val => ({ ...val, phone: '090-1234-5678の形式で入力してください。' }))
      check = false
    }
    else {
      setError((val) => ({ ...val, phone: "" }));
    }
    if (fax.length < 13 && !!fax) {
      setError(val => ({ ...val, fax: '090-1234-5678の形式で入力してください。' }))
      check = false
    }
    else {
      setError((val) => ({ ...val, fax: "" }));
    }
    if (!mail) {
      setError((val) => ({
        ...val,
        mail: "入力してください。",
      }));
      check = false;
    } else if (!validateEmail(mail)) {
      // console.log("Validate email")
      setError((val) => ({
        ...val,
        mail: 'メールアドレスを正く入力してください。'
      }));
      check = false
    }
    else {
      setError((val) => ({ ...val, mail: "" }));
    }
    if (contract_status === "1") {
      if (!gender) {
        setError((val) => ({
          ...val,
          gender: "選んでください。",
        }));
        check = false;
      } else {
        setError((val) => ({ ...val, gender: "" }));
      }
      if (!year) {
        setError((val) => ({
          ...val,
          year: "選んでください。",
        }));
        check = false;
      } else {
        setError((val) => ({ ...val, year: "" }));
      }
      if (!month) {
        setError((val) => ({
          ...val,
          month: "選んでください。",
        }));
        check = false;
      } else {
        setError((val) => ({ ...val, month: "" }));
      }
      if (!day) {
        setError((val) => ({
          ...val,
          day: "選んでください。",
        }));
        check = false;
      } else {
        setError((val) => ({ ...val, day: "" }));
      }
    }

    if (contract_status === "1") {
      if (contract_type == '法人') {
        if (!corp_address) {
          setError((val) => ({
            ...val,
            corp_address: "入力してください。",
          }));
          check = false;
        }
        else if (corp_address.length < 12) {
          setError(val => ({ ...val, corp_address: '090-1234-5678の形式で入力してください。' }))
          check = false
        }
        else {
          setError((val) => ({ ...val, corp_address: "" }));
        }
        if (!corp_resident) {
          setError((val) => ({ ...val, corp_resident: "お名前を入力してください。" }));
          check = false;
        } else {
          setError((val) => ({ ...val, corp_resident: "" }));
        }
      }
    }

    return check;
  };

  const [contract_status, setContractStatus] = useState('');
  useEffect(() => {
    AsyncStorage.getItem(CONTRACT_STATUS).then((val) => setContractStatus(val));
  }, []);

  const submit = () => {
    const check = checkText();
    if (!check) return;
    return navigation.navigate("FinishEditProfileScreen",
      {
        userName: name,
        nameKana: name_kana,
        user_contract_type: contract_type,
        user_article: article,
        user_roomNumber: room_number,
        user_phone: phone,
        corpResident: corp_resident,
        corpResidentKana: corp_resident_kana,
        corpAddress: corp_address,
        user_fax: fax,
        user_mail: mail,
        user_gender: gender,
        user_year: year,
        user_month: month,
        user_day: day,
      });
  };

  const errortInputStyle = {
    borderWidth: 1,
    borderColor: Colors.red,
    backgroundColor: Colors.pink,
  };
  return (
    <KeyboardAvoidingView enabled={Platform.OS === 'ios' ? true : false} behavior="padding">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, backgroundColor: "#FFFFFF" }}
      >
        <View style={{ flex: 1, marginTop: height * 0.1, marginHorizontal: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", alignSelf: "center" }}>
            マイページの編集（情報変更の申請）
          </Text>
          <Text style={{ marginTop: 30, color: "#0083BC" }}>
            情報の変更には審査がありますので、お時間を要すことがございます。ご了承ください。
          </Text>
          <Text style={profileStyle.text_section_title}>
            契約者情報
          </Text>
          <View style={profileStyle.profile_divider} />
          {contract_status === "0" && (
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text style={profileStyle.text_first_title}>名前</Text>
                <Text style={{ ...GlobalStyles.fontNote, color: Colors.white, backgroundColor: 'red', fontWeight: 'bold', paddingHorizontal: 2, marginLeft: 5, marginTop: 10, }}>{"必須"}</Text>
                {!!error.name && (
                  <Text style={profileStyle.error}>{" ※" + error.name}</Text>
                )}
              </View>
              <TextInput
                style={[GlobalStyles.inputField, !!error.name && errortInputStyle]}
                onChangeText={(text) => {
                  handleTextChange(text, "Name"), onNameChange(text);
                }}
                value={name}
                maxLength={255}
              />
              <View style={{ flexDirection: "row" }}>
                <Text style={profileStyle.text_title}>名前（カナ）</Text>
                <Text style={{ ...GlobalStyles.fontNote, color: Colors.white, backgroundColor: 'red', fontWeight: 'bold', paddingHorizontal: 2, marginLeft: 5, marginTop: 18 }}>{"必須"}</Text>
                {!!error.name_katakana && (
                  <Text style={profileStyle.error}>{" ※" + error.name_katakana}</Text>
                )}
              </View>

              <TextInput
                style={[
                  GlobalStyles.inputField,
                  !!error.name_katakana && errortInputStyle,
                ]}
                onChangeText={(text) => {
                  handleTextChange(text, "Name Kana");
                  onNameKanaChange(text);
                }}
                value={name_kana}
                maxLength={255}
              />
              <View style={{ flexDirection: "row" }}>
                <Text style={profileStyle.text_title}>電話番号</Text>
                <Text style={{ ...GlobalStyles.fontNote, color: Colors.white, backgroundColor: 'red', fontWeight: 'bold', paddingHorizontal: 2, marginLeft: 5, marginTop: 16 }}>{"必須"}</Text>
                {!!error.phone && (
                  <Text style={profileStyle.error}>{" ※" + error.phone}</Text>
                )}
              </View>
              <TextInput
                style={[GlobalStyles.inputField, !!error.phone && errortInputStyle]}
                onChangeText={(text) => {
                  // handleTextChange(text, "Phone"),
                  updatePhone(text);
                }}
                value={phone}
                keyboardType="numeric"
                maxLength={13}
              />
              <View style={{ flexDirection: "row" }}>
                <Text style={profileStyle.text_title}>
                  Eメールアドレス
                </Text>
                <Text style={{ ...GlobalStyles.fontNote, color: Colors.white, backgroundColor: 'red', fontWeight: 'bold', paddingHorizontal: 2, marginLeft: 5, marginTop: 18 }}>{"必須"}</Text>
                {!!error.mail && (
                  <Text style={profileStyle.error}>{" ※" + error.mail}</Text>
                )}
                {!!error.mail || (<Text style={[profileStyle.text_title, { alignSelf: 'flex-end' }]}>{"（半角英数字のみ）"}</Text>)}
              </View>
              <TextInput
                style={[GlobalStyles.inputField, !!error.mail && errortInputStyle]}
                onChangeText={(text) => {
                  handleTextChange(text, "Mail"),
                    onMailChange(text);
                }}
                value={mail}
                autoCapitalize='none'
                keyboardType="email-address"
                placeholder="leon@gmail.com"
                maxLength={255}
              />
            </View>
          )}
          {contract_status === "1" && (
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text style={profileStyle.text_first_title}>名前</Text>
                <Text style={{ ...GlobalStyles.fontNote, color: Colors.white, backgroundColor: 'red', fontWeight: 'bold', paddingHorizontal: 2, marginLeft: 5, marginTop: 10, }}>{"必須"}</Text>
                {!!error.name && (
                  <Text style={profileStyle.error}>{" ※" + error.name}</Text>
                )}
              </View>
              <TextInput
                style={[GlobalStyles.inputField, !!error.name && errortInputStyle]}
                onChangeText={(text) => {
                  handleTextChange(text, "Name"), onNameChange(text);
                }}
                value={name}
              />
              <View style={{ flexDirection: "row" }}>
                <Text style={profileStyle.text_title}>名前（カナ）</Text>
                <Text style={{ ...GlobalStyles.fontNote, color: Colors.white, backgroundColor: 'red', fontWeight: 'bold', paddingHorizontal: 2, marginLeft: 5, marginTop: 18 }}>{"必須"}</Text>
                {!!error.name_katakana && (
                  <Text style={profileStyle.error}>{" ※" + error.name_katakana}</Text>
                )}
              </View>

              <TextInput
                style={[
                  GlobalStyles.inputField,
                  !!error.name_katakana && errortInputStyle,
                ]}
                onChangeText={(text) => {
                  handleTextChange(text, "Name Kana");
                  onNameKanaChange(text);
                }}
                value={name_kana}
              />

              <View style={{ flexDirection: "row" }}>
                <Text style={profileStyle.text_title}>契約分類</Text>
                <Text style={{ ...GlobalStyles.fontNote, color: Colors.white, backgroundColor: 'red', fontWeight: 'bold', paddingHorizontal: 2, marginLeft: 5, marginTop: 18 }}>{"必須"}</Text>
                {!!error.contract_type && (
                  <Text style={profileStyle.error}>{" ※" + error.contract_type}</Text>
                )}
              </View>

              <RNPickerSelect
                placeholder={{
                  label: "",
                  value: null
                }}
                style={{
                  ...pickerSelectStyles,
                  iconContainer: {
                    top: 20,
                    right: width * 0.52,
                  },
                }}
                onValueChange={(value) => onContractChange(value)}
                items={[
                  { label: "個人", value: "個人" },
                  { label: "法人", value: "法人" },
                ]}
                useNativeAndroidPickerStyle={false}
                Icon={() => {
                  return <View style={profileStyle.icon} />;
                }}
              />
              <View style={{ flexDirection: "row" }}>
                <Text style={profileStyle.text_title}>お住まいの物件名</Text>
              </View>
              <TextInput
                style={[
                  GlobalStyles.inputField,
                  !!error.article && errortInputStyle,
                ]}
                onChangeText={(text) => {
                  handleTextChange(text, "Article");
                  onArticleChange(text);
                }}
                value={article}
              />

              <View style={{ flexDirection: "row" }}>
                <Text style={profileStyle.text_title}>号室</Text>
              </View>
              <TextInput
                style={[
                  GlobalStyles.inputField,
                  !!error.room_number && errortInputStyle,
                ]}
                onChangeText={(text) => {
                  handleTextChange(text, "Room Number");
                  onRoomNumberChange(text);
                }}
                value={room_number}
              />
              {contract_type === '個人' ? (
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={profileStyle.text_title}>電話番号</Text>
                    <Text style={{ ...GlobalStyles.fontNote, color: Colors.white, backgroundColor: 'red', fontWeight: 'bold', paddingHorizontal: 2, marginLeft: 5, marginTop: 16 }}>{"必須"}</Text>
                    {!!error.phone && (
                      <Text style={profileStyle.error}>{" ※" + error.phone}</Text>
                    )}
                    {!!error.phone || (<Text style={[profileStyle.text_title, { alignSelf: 'flex-end' }]}>{"（携帯電話番号）"}</Text>)}
                  </View>
                  <TextInput
                    style={[GlobalStyles.inputField, !!error.phone && errortInputStyle]}
                    onChangeText={(text) => {
                      // handleTextChange(text, "Phone"),
                      updatePhone(text);
                    }}
                    value={phone}
                    keyboardType="numeric"
                    maxLength={13}
                  />
                </View>
              ) : (<View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={profileStyle.text_title}>電話番号</Text>
                  <Text style={{ ...GlobalStyles.fontNote, color: Colors.white, backgroundColor: 'red', fontWeight: 'bold', paddingHorizontal: 2, marginLeft: 5, marginTop: 16 }}>{"必須"}</Text>
                  {!!error.phone && (
                    <Text style={profileStyle.error}>{" ※" + error.phone}</Text>
                  )}
                </View>
                <TextInput
                  style={[GlobalStyles.inputField, !!error.phone && errortInputStyle]}
                  onChangeText={(text) => {
                    // handleTextChange(text, "Phone"),
                    updatePhone(text);
                  }}
                  value={phone}
                  keyboardType="numeric"
                  maxLength={13}
                />
                <Text style={profileStyle.text_section_title}>
                  居住者情報
                </Text>
                <View style={profileStyle.profile_divider} />

                <View style={{ flexDirection: "row" }}>
                  <Text style={profileStyle.text_title}>居住者名前</Text>
                  <Text style={{ ...GlobalStyles.fontNote, color: Colors.white, backgroundColor: 'red', fontWeight: 'bold', paddingHorizontal: 2, marginLeft: 5, marginTop: 16 }}>{"必須"}</Text>
                  {!!error.corp_resident && (
                    <Text style={profileStyle.error}>{" ※" + error.corp_resident}</Text>
                  )}
                  {!!error.corp_resident || (<Text style={[profileStyle.text_title, { alignSelf: 'flex-end' }]}>{"（法人契約の場合の実際の入居者）"}</Text>)}
                </View>

                <TextInput
                  style={[GlobalStyles.inputField, !!error.corp_resident && errortInputStyle]}
                  onChangeText={(text) => {
                    handleTextChange(text, "Corp Resident");
                    onCorpResidentChange(text);
                  }}
                  value={corp_resident}
                />

                <View style={{ flexDirection: "row" }}>
                  <Text style={profileStyle.text_title}>居住者名前（カナ）</Text>

                </View>

                <TextInput
                  style={[GlobalStyles.inputField, !!error.corp_resident_katakana && errortInputStyle]}
                  onChangeText={(text) => {
                    handleTextChange(text, "Corp Resident Kana");
                    onCorpResidentKanaChange(text);
                  }}
                  value={corp_resident_kana}
                />

                <View style={{ flexDirection: "row" }}>
                  <Text style={profileStyle.text_title}>居住者連絡先</Text>
                  <Text style={{ ...GlobalStyles.fontNote, color: Colors.white, backgroundColor: 'red', fontWeight: 'bold', paddingHorizontal: 2, marginLeft: 5, marginTop: 16 }}>{"必須"}</Text>
                  {!!error.corp_address && (
                    <Text style={profileStyle.error}>{" ※" + error.corp_address}</Text>
                  )}
                  {!!error.corp_address || (<Text style={[profileStyle.text_title, { alignSelf: 'flex-end' }]}>{"（携帯電話番号）"}</Text>)}
                </View>

                <TextInput
                  style={[GlobalStyles.inputField, !!error.corp_address && errortInputStyle]}
                  onChangeText={(text) => {
                    // handleTextChange(text, "Phone"),
                    updateCorpAddress(text);
                  }}
                  value={corp_address}
                  keyboardType="numeric"
                  maxLength={13}
                />
              </View>)}

              <View style={{ flexDirection: "row" }}>
                <Text style={profileStyle.text_title}>FAX</Text>
                {!!error.fax && (
                  <Text style={profileStyle.error}>{" ※" + error.fax}</Text>
                )}
              </View>
              <TextInput
                style={[
                  GlobalStyles.inputField,
                  !!error.fax && errortInputStyle
                ]}
                onChangeText={(text) => {
                  handleTextChange(text, "Fax"), updateFax(text);
                }}
                value={fax}
                keyboardType="numeric"
                maxLength={13}
              />

              <View style={{ flexDirection: "row" }}>
                <Text style={profileStyle.text_title}>
                  Eメールアドレス
                </Text>
                <Text style={{ ...GlobalStyles.fontNote, color: Colors.white, backgroundColor: 'red', fontWeight: 'bold', paddingHorizontal: 2, marginLeft: 5, marginTop: 18 }}>{"必須"}</Text>
                {!!error.mail && (
                  <Text style={profileStyle.error}>{" ※" + error.mail}</Text>
                )}
                {!!error.mail || (<Text style={[profileStyle.text_title, { alignSelf: 'flex-end' }]}>{"（半角英数字のみ）"}</Text>)}
              </View>
              <TextInput
                style={[GlobalStyles.inputField, !!error.mail && errortInputStyle]}
                onChangeText={(text) => {
                  handleTextChange(text, "Mail"),
                    onMailChange(text);
                }}
                value={mail}
                autoCapitalize='none'
                keyboardType="email-address"
                placeholder="leon@gmail.com"
              />

              <View style={{ flexDirection: "row" }}>
                <Text style={profileStyle.text_title}>性別</Text>
                <Text style={{ ...GlobalStyles.fontNote, color: Colors.white, backgroundColor: 'red', fontWeight: 'bold', paddingHorizontal: 2, marginLeft: 5, marginTop: 18 }}>{"必須"}</Text>
                {!!error.gender && (
                  <Text style={profileStyle.error}>{" ※" + error.gender}</Text>
                )}
              </View>
              <RNPickerSelect
                placeholder={{
                  label: "",
                  value: null,
                }}
                style={{
                  ...pickerSelectStyles,
                  iconContainer: {
                    top: 20,
                    right: width * 0.52,
                  },
                }}
                onValueChange={(value) => onGenderChange(value)}
                items={[
                  { label: "男性", value: "男性" },
                  { label: "女性", value: "女性" },
                ]}
                useNativeAndroidPickerStyle={false}
                Icon={() => {
                  return <View style={profileStyle.icon} />;
                }}
              />
              <View style={{ flexDirection: "row" }}>
                <Text style={profileStyle.text_title}>生年月日</Text>
                <Text style={{ ...GlobalStyles.fontNote, color: Colors.white, backgroundColor: 'red', fontWeight: 'bold', paddingHorizontal: 2, marginLeft: 5, marginTop: 18 }}>{"必須"}</Text>
                {!!error.year && (
                  <Text style={profileStyle.error}>{" ※" + error.year}</Text>
                )}
                {!!error.month && (
                  <Text style={profileStyle.error}>{" ※" + error.month}</Text>
                )}
                {!!error.day && (
                  <Text style={profileStyle.error}>{" ※" + error.day}</Text>
                )}
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <RNPickerSelect
                  placeholder={{
                    label: "年",
                    value: null,
                  }}
                  style={{
                    ...timePickerStyle,
                    iconContainer: {
                      top: 20,
                      right: 16,
                    },
                  }}
                  onValueChange={(value) => {
                    onYearChange(value);
                  }}
                  items={listYears}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => {
                    return <View style={profileStyle.icon} />;
                  }}
                />
                <RNPickerSelect
                  placeholder={{
                    label: "月",
                    value: null,
                  }}
                  style={{
                    ...timePickerStyle,
                    iconContainer: {
                      top: 20,
                      right: 16,
                    },
                  }}
                  onValueChange={(value) => {
                    // updateDays(value, state);
                    onMonthChange(value);
                  }}
                  items={listMonths}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => {
                    return <View style={profileStyle.icon} />;
                  }}
                />
                <RNPickerSelect
                  placeholder={{
                    label: "日",
                    value: null,
                  }}
                  style={{
                    ...timePickerStyle,
                    iconContainer: {
                      top: 20,
                      right: 16,
                    },
                  }}
                  onValueChange={(value) => {
                    onDayChange(value);
                  }}
                  items={listDays}
                  useNativeAndroidPickerStyle={false}
                  Icon={() => {
                    return <View style={profileStyle.icon} />;
                  }}
                />
              </View>
            </View>
          )}

          <Button
            titleStyle={{ color: "white", fontWeight: "bold", fontSize: 16 }}
            buttonStyle={{
              backgroundColor: Colors.primary,
              borderRadius: 8,
              marginTop: 40,
              marginBottom: 80,
              height: 50,
            }}
            title="内容を確認する"
            onPress={submit}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function range(start, end) {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
}

const profileStyle = StyleSheet.create({
  text_section_title: {
    fontSize: 18,
    marginTop: 40,
    fontWeight: "bold",
  },
  text_first_title: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 10,
  },
  text_title: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 18,
  },
  text_content: {
    fontSize: 13,
    marginTop: 14,
    marginStart: 12,
  },
  profile_divider: {
    backgroundColor: "#AAAAAA",
    height: 1,
    marginTop: 4,
  },
  icon: {
    backgroundColor: "transparent",
    borderTopWidth: 10,
    borderTopColor: "gray",
    borderRightWidth: 10,
    borderRightColor: "transparent",
    borderLeftWidth: 10,
    borderLeftColor: "transparent",
    width: 0,
    height: 0,
  },
  text_input: {
    height: 40,
    width: 100,
    borderColor: "#AAAAAA",
    borderWidth: 1,
    marginTop: 6,
    borderRadius: 4,
    paddingStart: 8,
  },
  text_input_wide: {
    height: 40,
    width: 160,
    borderColor: "#AAAAAA",
    borderWidth: 1,
    marginTop: 6,
    borderRadius: 4,
    paddingStart: 8,
  },
  text_input_normal: {
    height: 40,
    width: 130,
    borderColor: "#AAAAAA",
    borderWidth: 1,
    marginTop: 6,
    borderRadius: 4,
    paddingStart: 8,
  },
  error: {
    ...GlobalStyles.fontNote,
    alignSelf: "flex-end",
    color: Colors.red,
    fontWeight: "bold",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    marginTop: 6,
    borderColor: "#AAAAAA",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    width: width * 0.4,
    height: 40,
    marginTop: 6,
  },
  inputAndroid: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "#AAAAAA",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    width: width * 0.4,
    height: 40,
    marginTop: 6,
  },
});

const timePickerStyle = StyleSheet.create({
  inputIOS: {
    fontSize: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    marginTop: 6,
    borderColor: "#AAAAAA",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    width: width * 0.28,
    height: 40,
    marginTop: 6,
    marginEnd: 8,
  },
  inputAndroid: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#AAAAAA",
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    width: width * 0.28,
    height: 40,
    marginTop: 6,
    marginEnd: 8,
  },
});
