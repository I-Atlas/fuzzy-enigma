import Chat from "@/assets/svg/tabs/chat.svg";
import ChatSelected from "@/assets/svg/tabs/chat_selected.svg";
import Home from "@/assets/svg/tabs/home.svg";
import HomeSelected from "@/assets/svg/tabs/home_selected.svg";
import Team from "@/assets/svg/tabs/team.svg";
import TeamSelected from "@/assets/svg/tabs/team_selected.svg";
import { PillTabBar } from "@/components/ui/PillTabBar";
import { Tabs } from "expo-router";

export default function AppTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <PillTabBar {...props} />}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Главная",
          tabBarIcon: (props) =>
            props.focused ? <HomeSelected {...props} /> : <Home {...props} />,
        }}
      />
      <Tabs.Screen
        name="team"
        options={{
          title: "Команда",
          tabBarIcon: (props) =>
            props.focused ? <TeamSelected {...props} /> : <Team {...props} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Чат",
          tabBarIcon: (props) =>
            props.focused ? <ChatSelected {...props} /> : <Chat {...props} />,
        }}
      />
    </Tabs>
  );
}
