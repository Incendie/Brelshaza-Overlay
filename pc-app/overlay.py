import wx


class FancyFrame(wx.Frame):
    def __init__(self):
        style = (wx.CLIP_CHILDREN | wx.STAY_ON_TOP | wx.FRAME_NO_TASKBAR |
                 wx.NO_BORDER | wx.FRAME_SHAPED)
        wx.Frame.__init__(self, None, title='Fancy', style=style)
        self.Bind(wx.EVT_KEY_UP, self.OnKeyDown)
        self.Bind(wx.EVT_MOTION, self.OnMouse)
        self.SetTransparent(100)
        self.Show(True)
        self.panel = wx.Panel(self, id=wx.ID_ANY,
                              pos=(10, 10), size=(240, 120))
        self.blueButton = wx.Button(
            self.panel, wx.ID_ANY, "Blue Meteor", (12, 12), (120, 40))
        self.blueButton.SetBackgroundColour("blue")
        self.blueButton.SetOwnForegroundColour("white")
        self.blueButton.SetTransparent(255)
        # self.blueButton.SetBitmapCurrent(
        #     wx.StaticBitmap(self, -1, None, (10, 10)))

    def OnKeyDown(self, event):
        """quit if user press q or Esc"""
        if event.GetKeyCode() == 27 or event.GetKeyCode() == ord('Q'):  # 27 is Esc
            self.Close(force=True)
        else:
            event.Skip()

    def OnMouse(self, event):
        """implement dragging"""
        if not event.Dragging():
            self._dragPos = None
            return
        # self.CaptureMouse()
        if not self._dragPos:
            self._dragPos = event.GetPosition()
        else:
            pos = event.GetPosition()
            displacement = self._dragPos - pos
            self.SetPosition(self.GetPosition() - displacement)


app = wx.App()
f = FancyFrame()
app.MainLoop()
