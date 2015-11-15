<GameProjectFile>
  <PropertyGroup Type="Layer" Name="bg_large_level_3" ID="3821b969-2d28-4329-9ef7-b5b3591ee432" Version="2.3.2.3" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="645" Speed="1.0000">
        <Timeline ActionTag="872339399" Property="Position">
          <PointFrame FrameIndex="0" X="620.6393" Y="202.6113">
            <EasingData Type="0" />
          </PointFrame>
          <PointFrame FrameIndex="322" X="670.6390" Y="202.6113">
            <EasingData Type="0" />
          </PointFrame>
          <PointFrame FrameIndex="645" X="620.6400" Y="202.6113">
            <EasingData Type="0" />
          </PointFrame>
        </Timeline>
        <Timeline ActionTag="872339399" Property="Scale">
          <ScaleFrame FrameIndex="0" X="0.9805" Y="0.9805">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="322" X="0.9805" Y="0.9805">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="645" X="0.9805" Y="0.9805">
            <EasingData Type="0" />
          </ScaleFrame>
        </Timeline>
        <Timeline ActionTag="872339399" Property="RotationSkew">
          <ScaleFrame FrameIndex="0" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="322" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </ScaleFrame>
          <ScaleFrame FrameIndex="645" X="0.0000" Y="0.0000">
            <EasingData Type="0" />
          </ScaleFrame>
        </Timeline>
      </Animation>
      <ObjectData Name="bg_layer_dark" Tag="455" ctype="GameLayerObjectData">
        <Size X="1334.0000" Y="750.0000" />
        <Children>
          <AbstractNodeData Name="bg_color" ActionTag="1667344726" Tag="457" IconVisible="False" LeftMargin="0.0020" RightMargin="-0.0020" TopMargin="0.0009" BottomMargin="-0.0009" TouchEnable="True" ComboBoxIndex="1" ColorAngle="90.0000" ctype="PanelObjectData">
            <Size X="1334.0000" Y="750.0000" />
            <Children>
              <AbstractNodeData Name="Particle_3" ActionTag="1045271323" Tag="1359" IconVisible="True" LeftMargin="760.8929" RightMargin="573.1071" TopMargin="396.4753" BottomMargin="353.5247" ctype="ParticleObjectData">
                <Size X="0.0000" Y="0.0000" />
                <AnchorPoint />
                <Position X="760.8929" Y="353.5247" />
                <Scale ScaleX="1.0000" ScaleY="1.0000" />
                <CColor A="255" R="255" G="255" B="255" />
                <PrePosition X="0.5704" Y="0.4714" />
                <PreSize X="0.0000" Y="0.0000" />
                <FileData Type="Normal" Path="images/rain.plist" Plist="" />
                <BlendFunc Src="770" Dst="771" />
              </AbstractNodeData>
            </Children>
            <AnchorPoint />
            <Position X="0.0020" Y="-0.0009" />
            <Scale ScaleX="1.0000" ScaleY="1.6667" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.0000" Y="0.0000" />
            <PreSize X="1.0000" Y="1.0000" />
            <SingleColor A="255" R="9" G="47" B="92" />
            <FirstColor A="255" R="150" G="200" B="255" />
            <EndColor A="255" R="255" G="255" B="255" />
            <ColorVector ScaleY="1.0000" />
          </AbstractNodeData>
          <AbstractNodeData Name="landscape" ActionTag="872339399" Tag="456" IconVisible="False" LeftMargin="-115.3607" RightMargin="-22.6393" TopMargin="327.3887" BottomMargin="-17.3887" Scale9Width="1472" Scale9Height="440" ctype="ImageViewObjectData">
            <Size X="1472.0000" Y="440.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="620.6393" Y="202.6113" />
            <Scale ScaleX="0.9805" ScaleY="0.9805" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.4652" Y="0.2701" />
            <PreSize X="1.1034" Y="0.5867" />
            <FileData Type="Normal" Path="images/mediumRes/landscape-736x220@2x.png" Plist="" />
          </AbstractNodeData>
          <AbstractNodeData Name="Image_2" ActionTag="173734514" Tag="458" IconVisible="False" LeftMargin="944.3281" RightMargin="271.6719" TopMargin="-28.0574" BottomMargin="660.0574" Scale9Width="118" Scale9Height="118" ctype="ImageViewObjectData">
            <Size X="118.0000" Y="118.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="1003.3281" Y="719.0574" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.7521" Y="0.9587" />
            <PreSize X="0.0885" Y="0.1573" />
            <FileData Type="Normal" Path="images/mediumRes/moon@2x.png" Plist="" />
          </AbstractNodeData>
          <AbstractNodeData Name="star_1" ActionTag="1967251879" Tag="580" IconVisible="False" LeftMargin="452.5139" RightMargin="859.4861" TopMargin="312.0792" BottomMargin="415.9208" ctype="SpriteObjectData">
            <Size X="22.0000" Y="22.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="463.5139" Y="426.9208" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.3475" Y="0.5692" />
            <PreSize X="0.0000" Y="0.0000" />
            <FileData Type="Normal" Path="images/smallRes/star.png" Plist="" />
            <BlendFunc Src="770" Dst="771" />
          </AbstractNodeData>
          <AbstractNodeData Name="star_2" ActionTag="797573375" Tag="581" IconVisible="False" LeftMargin="131.1643" RightMargin="1180.8357" TopMargin="80.2650" BottomMargin="647.7350" ctype="SpriteObjectData">
            <Size X="22.0000" Y="22.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="142.1643" Y="658.7350" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.1066" Y="0.8783" />
            <PreSize X="0.0000" Y="0.0000" />
            <FileData Type="Normal" Path="images/smallRes/star.png" Plist="" />
            <BlendFunc Src="770" Dst="771" />
          </AbstractNodeData>
          <AbstractNodeData Name="star_3" ActionTag="461210249" Tag="582" IconVisible="False" LeftMargin="216.5676" RightMargin="1095.4325" TopMargin="228.7039" BottomMargin="499.2961" ctype="SpriteObjectData">
            <Size X="22.0000" Y="22.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="227.5676" Y="510.2961" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.1706" Y="0.6804" />
            <PreSize X="0.0000" Y="0.0000" />
            <FileData Type="Normal" Path="images/smallRes/star.png" Plist="" />
            <BlendFunc Src="770" Dst="771" />
          </AbstractNodeData>
          <AbstractNodeData Name="star_4" ActionTag="687549231" Tag="583" IconVisible="False" LeftMargin="419.9086" RightMargin="892.0914" TopMargin="98.5657" BottomMargin="629.4343" ctype="SpriteObjectData">
            <Size X="22.0000" Y="22.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="430.9086" Y="640.4343" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.3230" Y="0.8539" />
            <PreSize X="0.0000" Y="0.0000" />
            <FileData Type="Normal" Path="images/smallRes/star.png" Plist="" />
            <BlendFunc Src="770" Dst="771" />
          </AbstractNodeData>
          <AbstractNodeData Name="star_5" ActionTag="1242677039" Tag="584" IconVisible="False" LeftMargin="842.8580" RightMargin="469.1420" TopMargin="106.6993" BottomMargin="621.3007" ctype="SpriteObjectData">
            <Size X="22.0000" Y="22.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="853.8580" Y="632.3007" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.6401" Y="0.8431" />
            <PreSize X="0.0000" Y="0.0000" />
            <FileData Type="Normal" Path="images/smallRes/star.png" Plist="" />
            <BlendFunc Src="770" Dst="771" />
          </AbstractNodeData>
          <AbstractNodeData Name="star_6" ActionTag="-1334921829" Tag="585" IconVisible="False" LeftMargin="661.8844" RightMargin="650.1156" TopMargin="212.4366" BottomMargin="515.5634" ctype="SpriteObjectData">
            <Size X="22.0000" Y="22.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="672.8844" Y="526.5634" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5044" Y="0.7021" />
            <PreSize X="0.0000" Y="0.0000" />
            <FileData Type="Normal" Path="images/smallRes/star.png" Plist="" />
            <BlendFunc Src="770" Dst="771" />
          </AbstractNodeData>
          <AbstractNodeData Name="star_7" ActionTag="1743284095" Tag="586" IconVisible="False" LeftMargin="1237.3396" RightMargin="74.6604" TopMargin="72.1313" BottomMargin="655.8687" ctype="SpriteObjectData">
            <Size X="22.0000" Y="22.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="1248.3396" Y="666.8687" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.9358" Y="0.8892" />
            <PreSize X="0.0000" Y="0.0000" />
            <FileData Type="Normal" Path="images/smallRes/star.png" Plist="" />
            <BlendFunc Src="770" Dst="771" />
          </AbstractNodeData>
          <AbstractNodeData Name="star_8" ActionTag="675973424" Tag="587" IconVisible="False" LeftMargin="1174.3038" RightMargin="137.6962" TopMargin="226.6705" BottomMargin="501.3295" ctype="SpriteObjectData">
            <Size X="22.0000" Y="22.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="1185.3038" Y="512.3295" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.8885" Y="0.6831" />
            <PreSize X="0.0000" Y="0.0000" />
            <FileData Type="Normal" Path="images/smallRes/star.png" Plist="" />
            <BlendFunc Src="770" Dst="771" />
          </AbstractNodeData>
          <AbstractNodeData Name="star_9" ActionTag="-1565609653" Tag="588" IconVisible="False" LeftMargin="661.8844" RightMargin="650.1156" TopMargin="51.7972" BottomMargin="676.2028" ctype="SpriteObjectData">
            <Size X="22.0000" Y="22.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="672.8844" Y="687.2028" />
            <Scale ScaleX="1.0000" ScaleY="1.0000" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.5044" Y="0.9163" />
            <PreSize X="0.0000" Y="0.0000" />
            <FileData Type="Normal" Path="images/smallRes/star.png" Plist="" />
            <BlendFunc Src="770" Dst="771" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameProjectFile>