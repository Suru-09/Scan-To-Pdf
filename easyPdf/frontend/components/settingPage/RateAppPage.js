import React from "react";

// React-native materials
import { VStack } from 'react-native-flex-layout';
import {IconComponentProvider, Text} from "@react-native-material/core";
import flex from "react-native-flex-layout/src/Flex";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Rating } from 'react-native-elements';

// constans
import {colors} from "../../constants/Colors";
import {Button, TouchableOpacity} from "react-native";

// redux
import store from "../../redux/store";

// hooks
import {useState, useEffect} from "react";
import {getRating, updateRating} from "../../bzl/drawer/RateBzl";

const RateAppPage = () => {
    const [currentUser, setUser] = useState({username: "Empty", email: "empty@gmail.com"})
    const [state, setState] = useState(null);
    const [rating, setRating] = useState(null);
    const [reactRating, setReactRating] = useState(-1);

    useEffect(() => {
        async function loadReduxState() {
            const state = await store.getState();
            setState(state);
        }
        async function loadUser() {
            if(state != null) {
                const user = await state.userReducer.loginUser;
                setUser(user);
            }
        }
        async function loadRating() {
            if(currentUser.username !== "Empty") {
                const rating = await getRating(currentUser.id);
                setRating(rating["rating"]);
            }
        }
        loadReduxState().then(r => console.log("State has been set!"));
        loadUser().then(r => console.log("User has been set!"));
        loadRating().then(r => console.log(rating));

    }, [state, currentUser]);

    const updateRate = async (rating) => {
        const result = await updateRating(currentUser.id, rating);
        console.log(`Result of updating rating:`);
        console.log(result);
    }

    return(
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <VStack spacing={10} style={{
                display:"flex",
                maxWidth:"100%",
                height: "100%", width: "100%",
                paddingTop:"50%", backgroundColor: colors.darker_background,
                flexDirection:"column", paddingLeft: "5%",
                justifyContent: "flex-start",
            }} >
                <Text style={{
                    textAlign: "left" , color: "white",
                    fontSize: 32 , fontWeight: "600",
                }}>
                    Rate app
                </Text>
                <Rating
                    type="custom"
                    ratingCount={5}
                    fractions={1}
                    showRating
                    startingValue={rating != null && rating !== false ? rating : 1}
                    readonly={rating != null && rating !== false}
                    ratingBackgroundColor={colors.lighter_background}
                    tintColor={colors.darker_background}
                    imageSize={60}
                    onFinishRating={ async (value) => setReactRating(value)}
                    style={{
                        paddingVertical: 10, backgroundColor: 'transparent'
                    }}
                  />
                {rating != null && rating !== false ?
                    <Text style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: colors.text,
                        alignSelf: "center"
                    }}
                    >
                        You have already submitted your rating!
                    </Text>
                    : <TouchableOpacity style={{
                        alignSelf: "center"}}
                        onPress={async () => {await updateRate(reactRating)}}
                    >
                        <Text style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: colors.text
                        }}>
                            Submit rating
                        </Text>
                    </TouchableOpacity>
                }

            </VStack>
        </IconComponentProvider>
    );
}

export default RateAppPage;
