<GameFile>
  <PropertyGroup Name="bg_large_level_1" Type="Layer" ID="ae3fb395-65b6-4583-9a92-5cd609c50001" Version="2.3.3.0" />
  <Content ctype="GameProjectContent">
    <Content>
      <Animation Duration="645" Speed="2.0000">
        <Timeline ActionTag="1498243013" Property="Position">
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
        <Timeline ActionTag="1498243013" Property="Scale">
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
        <Timeline ActionTag="1498243013" Property="RotationSkew">
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
      <ObjectData Name="bg_large" Tag="90" ctype="GameLayerObjectData">
        <Size X="1334.0000" Y="750.0000" />
        <Children>
          <AbstractNodeData Name="sun" CanEdit="False" ActionTag="465466082" Tag="1160" IconVisible="False" LeftMargin="307.9644" RightMargin="774.0356" TopMargin="-19.3767" BottomMargin="517.3767" ctype="SpriteObjectData">
            <Size X="252.0000" Y="252.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="433.9644" Y="643.3767" />
            <Scale ScaleX="0.4352" ScaleY="0.4352" />
            <CColor A="255" R="255" G="255" B="0" />
            <PrePosition X="0.3253" Y="0.8578" />
            <PreSize X="0.0000" Y="0.0000" />
            <FileData Type="Normal" Path="images/largeRes/sun-84x84@3x.png" Plist="" />
            <BlendFunc Src="1" Dst="771" />
          </AbstractNodeData>
          <AbstractNodeData Name="landscape" ActionTag="1498243013" Tag="93" IconVisible="False" LeftMargin="-115.3607" RightMargin="-22.6393" TopMargin="327.3887" BottomMargin="-17.3887" Scale9Width="1472" Scale9Height="440" ctype="ImageViewObjectData">
            <Size X="1472.0000" Y="440.0000" />
            <AnchorPoint ScaleX="0.5000" ScaleY="0.5000" />
            <Position X="620.6393" Y="202.6113" />
            <Scale ScaleX="0.9805" ScaleY="0.9805" />
            <CColor A="255" R="255" G="255" B="255" />
            <PrePosition X="0.4652" Y="0.2701" />
            <PreSize X="1.1034" Y="0.5867" />
            <FileData Type="Normal" Path="images/mediumRes/landscape-736x220@2x.png" Plist="" />
          </AbstractNodeData>
        </Children>
      </ObjectData>
    </Content>
  </Content>
</GameFile>