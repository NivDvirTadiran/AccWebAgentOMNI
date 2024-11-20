import {Input} from "@angular/core";
import {StatusLabel} from "../../../.././sb-main-desk/call-bar/status-label/status-lable.model";
import {MsgGroup} from "../../../.././sb-main-desk/chat/chat.component";
import {BubbleModel} from "../../../../sb-main-desk/chat/bubble/bubble.model";

export interface CallItemModel
{
  m_CallId: string;
  channelType: string;
  lastMessage: string;
  //lastBubble: BubbleModel;
  lastMessageTime: Date;
  // isLastMessageFromUser: boolean;
  notification: boolean;
  status: StatusLabel;
  checked: boolean;
  isGrayed: boolean;
  isShowItem: boolean;
  customerName: string;
  clicked: boolean;
  summaryMessage: string;
}
