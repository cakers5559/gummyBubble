<GameProjectFile>
  <PropertyGroup Type="Scene" Name="GameScene" ID="9c683865-49e8-402e-9941-705a4145b464" Version="2.3.2.3" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="17" Speed="1.0000">
        <Timeline ActionTag="-155669652" Property="ActionValue">
          <InnerActionFrame FrameIndex="0" Tween="False" InnerActionType="SingleFrame" CurrentAniamtionName="-- ALL --" SingleFrameIndex="0" />
          <InnerActionFrame FrameIndex="17" Tween="False" InnerActionType="SingleFrame" CurrentAniamtionName="-- ALL --" SingleFrameIndex="0" />
        </Timeline>
        <Timeline ActionTag="-155669652" Property="Position">
          <PointFrame FrameIndex="0" X="10.5386" Y="0.4247">
            <EasingData Type="0" />
          </PointFrame>
          <PointFrame FrameIndex="17" X="624.7635" Y="0.4250">
            <EasingData Type="0" />
          </PointFrame>
        </Timeline>
        <Timeline ActionTag="-155669652" Property="Scale">
          <ScaleFrame FrameIndex="0" X="0.8614" Y="0.8614">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="17" X="0.8614" Y="0.8614">
            <EasingData Type="0" />
          </ScaleFrame>
        </Timeline>
        <Timeline ActionTag="-155669652" Property="RotationSkew">
          <ScaleFrame FrameIndex="0" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="17" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </ScaleFrame>
        </Timeline>
      </Animation>
      <ObjectData Name="GameScene" Tag="175" ctype="GameNodeObjectData">
        <Size X="2048.0000" Y="1536.0000" />
        <Children>
          <AbstractNodeData Name="panel_level_1" ActionTag="1761969222" Tag="1230" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" StretchWidthEnable="True" StretchHeightEnable="True" ComboBoxIndex="1" ColorAngle="90.0000" ctype="PanelObjectData">
            <Size X="2048.0000" Y="1536.0000" />
            <Children>
              <AbstractNodeData Name="mountains" ActionTag="-444028172" Tag="1146" IconVisible="True" HorizontalEdge="BothEdge" LeftMargin="-105.4153" RightMargin="979.4153" TopMargin="458.8396" BottomMargin="33.1604" InnerActionSpeed="1.0000" ctype="ProjectNodeObjectData">
                <Size X="1334.0000" Y="750.0000" />
                <AnchorPoint />
                <Position X="-97.7766" Y="33.1604" />
                <Scale ScaleX="0.7468" ScaleY="0.7468" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="-0.0477" Y="0.0267" />
                <PreSize X="0.6042" Y="0.6039" />
                <FileData Type="Normal" Path="game_screen_assets/layers/level_1/mountains.csd" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="bg_level_1" ActionTag="-155669652" Tag="1632" IconVisible="True" HorizontalEdge="BothEdge" VerticalEdge="BottomEdge" LeftMargin="10.5386" RightMargin="703.4614" TopMargin="785.5753" BottomMargin="0.4247" InnerActionSpeed="2.0000" ctype="ProjectNodeObjectData">
                <Size X="1334.0000" Y="750.0000" />
                <AnchorPoint />
                <Position X="10.5386" Y="0.4247" />
                <Scale ScaleX="0.8614" ScaleY="0.8614" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.0051" Y="0.0003" />
                <PreSize X="1.0000" Y="1.0000" />
                <FileData Type="Normal" Path="game_screen_assets/layers/level_1/bg_large_level_1.csd" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="clouds" ActionTag="-200723507" Tag="573" IconVisible="True" HorizontalEdge="BothEdge" VerticalEdge="TopEdge" LeftMargin="-101.7198" RightMargin="-58.2803" TopMargin="227.8613" BottomMargin="66.1386" InnerActionSpeed="1.0000" ctype="ProjectNodeObjectData">
                <Size X="2208.0000" Y="1242.0000" />
                <AnchorPoint />
                <Position X="-101.7198" Y="66.1386" />
                <Scale ScaleX="0.4559" ScaleY="0.4559" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="-0.0497" Y="0.0431" />
                <PreSize X="1.6552" Y="1.6560" />
                <FileData Type="Normal" Path="game_screen_assets/layers/level_1/clouds_layer.csd" Plist="" />
              </AbstractNodeData>
              <AbstractNodeData Name="pause_btn" ActionTag="1899077289" Tag="1183" IconVisible="False" HorizontalEdge="LeftEdge" VerticalEdge="TopEdge" LeftMargin="0.8107" RightMargin="1941.1893" TopMargin="906.0419" BottomMargin="521.9581" TouchEnable="True" FontSize="14" Scale9Enable="True" LeftEage="15" RightEage="15" TopEage="11" BottomEage="11" Scale9OriginX="15" Scale9OriginY="11" Scale9Width="76" Scale9Height="86" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ctype="ButtonObjectData">
                <Size X="106.0000" Y="108.0000" />
                <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
                <Position X="53.8107" Y="575.9581" />
                <Scale ScaleX="0.6091" ScaleY="0.6091" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.0263" Y="0.3750" />
                <PreSize X="0.0480" Y="0.0870" />
                <TextColor A="255" R="65" G="65" B="70" />
                <DisabledFileData Type="Default" Path="Default/Button_Disable.png" Plist="" />
                <PressedFileData Type="Default" Path="Default/Button_Press.png" Plist="" />
                <NormalFileData Type="Normal" Path="images/mediumRes/pause-53x54@2x.png" Plist="" />
                <OutlineColor A="255" R="255" G="0" B="0" />
                <ShadowColor A="255" R="110" G="110" B="110" />
              </AbstractNodeData>
              <AbstractNodeData Name="gummies_txt" ActionTag="-528661809" Tag="1184" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" LeftMargin="693.6075" RightMargin="1146.3926" TopMargin="936.0616" BottomMargin="550.9384" FontSize="40" LabelText="Gummies : 0	" HorizontalAlignmentType="HT_Right" VerticalAlignmentType="VT_Center" OutlineEnabled="True" ShadowOffsetX="2.0000" ShadowOffsetY="-2.0000" ShadowEnabled="True" ctype="TextObjectData">
                <Size X="208.0000" Y="49.0000" />
                <AnchorPoint ScaleX="0.4510" ScaleY="0.4234" />
                <Position X="787.4174" Y="571.6836" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.3845" Y="0.3722" />
                <PreSize X="0.0498" Y="0.0185" />
                <FontResource Type="Normal" Path="Bobbleboddy.ttf" Plist="" />
                <OutlineColor A="255" R="127" G="127" B="127" />
                <ShadowColor A="255" R="0" G="0" B="0" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint />
            <Position />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition />
            <PreSize X="1.0000" Y="1.0000" />
            <SingleColor A="255" R="74" G="144" B="226" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="how_to_play_super_large" CanEdit="False" ActionTag="-791219751" VisibleForFrame="False" Tag="221" IconVisible="True" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" RightMargin="-160.0000" TopMargin="294.0000" InnerActionSpeed="2.0000" ctype="ProjectNodeObjectData">
            <Size X="2208.0000" Y="1242.0000" />
            <AnchorPoint />
            <Position />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition />
            <PreSize X="1.0781" Y="0.8086" />
            <FileData Type="Normal" Path="game_screen_assets/layers/how_to_play_screen/how_to_play_super_large.csd" Plist="" />
          </AbstractNodeData>
          <AbstractNodeData Name="how_to_play_large" CanEdit="False" ActionTag="-1391247423" VisibleForFrame="False" Tag="258" IconVisible="True" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" RightMargin="714.0000" TopMargin="786.0000" InnerActionSpeed="2.0000" ctype="ProjectNodeObjectData">
            <Size X="1334.0000" Y="750.0000" />
            <AnchorPoint />
            <Position />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition />
            <PreSize X="0.6514" Y="0.4883" />
            <FileData Type="Normal" Path="game_screen_assets/layers/how_to_play_screen/how_to_play_large.csd" Plist="" />
          </AbstractNodeData>
          <AbstractNodeData Name="how_to_play_medium" CanEdit="False" ActionTag="1440023423" VisibleForFrame="False" Tag="263" IconVisible="True" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" RightMargin="912.0000" TopMargin="896.0000" InnerActionSpeed="2.0000" ctype="ProjectNodeObjectData">
            <Size X="1136.0000" Y="640.0000" />
            <AnchorPoint />
            <Position />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition />
            <PreSize X="0.5547" Y="0.4167" />
            <FileData Type="Normal" Path="game_screen_assets/layers/how_to_play_screen/how_to_play_medium.csd" Plist="" />
          </AbstractNodeData>
          <AbstractNodeData Name="how_to_play_small" CanEdit="False" ActionTag="-1765824072" VisibleForFrame="False" Tag="268" IconVisible="True" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" RightMargin="1088.0000" TopMargin="896.0000" InnerActionSpeed="2.0000" ctype="ProjectNodeObjectData">
            <Size X="960.0000" Y="640.0000" />
            <AnchorPoint />
            <Position />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition />
            <PreSize X="0.4688" Y="0.4167" />
            <FileData Type="Normal" Path="game_screen_assets/layers/how_to_play_screen/how_to_play_small.csd" Plist="" />
          </AbstractNodeData>
          <AbstractNodeData Name="tap_to_start_screen" CanEdit="False" ActionTag="-1627601985" Alpha="0" Tag="1423" IconVisible="False" HorizontalEdge="BothEdge" VerticalEdge="BothEdge" TouchEnable="True" StretchWidthEnable="True" StretchHeightEnable="True" BackColorAlpha="0" ComboBoxIndex="1" ColorAngle="90.0000" ctype="PanelObjectData">
            <Size X="2048.0000" Y="1536.0000" />
            <AnchorPoint />
            <Position />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition />
            <PreSize X="1.0000" Y="1.0000" />
            <SingleColor A="255" R="150" G="200" B="255" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameProjectFile>