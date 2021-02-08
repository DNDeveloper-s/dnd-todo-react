import React from 'react';
import moment from 'moment';

import DotsMenuHorizontal from "../../../../icons/DotsMenuHorizontal";
import Dropdown from "../../../UI/Dropdown/Dropdown";
import SubTaskIcon from "../../../../icons/SubTaskIcon";
import LabelIcon from "../../../../icons/LabelIcon";
import AttachmentIcon from "../../../../icons/AttachmentIcon";
import CopyIcon from "../../../../icons/CopyIcon";
import DeleteIcon from "../../../../icons/DeleteIcon";
import TaskAttachment from "./TaskAttachment";
import CommentIcon from "../../../../icons/CommentIcon";
import AppInput from "../../../UI/AppInput";

import DefaultImage from "../../../../assets/images/default.jpg"
import CommentsFillIcon from "../../../../icons/CommentsFillIcon";
import ActivityIcon from "../../../../icons/ActivityIcon";

const footerOptions = [
	{id: '1', name: 'Add Subtasks', Icon: SubTaskIcon},
	{id: '2', name: 'Tags', Icon: LabelIcon},
	{id: '3', name: 'Upload Attachment', Icon: AttachmentIcon, Component: true},
	{id: '4', name: 'Copy Link', Icon: CopyIcon},
	{id: '5', name: 'Delete', Icon: DeleteIcon},
	{id: '6', name: 'Show Activities', Icon: ActivityIcon},
];

const DetailsBarFooter = ({onUpload, commentState, handleCommentState}) => {

	return (
		<div className="dashboard-detailsBar-footer">
			{/* Dynamic Comments comes here. */}
			{commentState.isVisible &&
				<div className="dashboard-detailsBar-footer-comment-view">
					<AppInput
						containerClassNames={['dashboard-detailsBar-footer-comment-inputBox']}
						onChange={handleCommentState.handleValue}
						value={commentState.value}
						placeholder="Enter your comment..."
						handleReturn={() => handleCommentState.postComment({
							author: "Saurabh Singh",
							value: commentState.value
						})}
					/>
					<div className="dashboard-detailsBar-footer-comment-holder">
						{commentState.data.map(item => (
							<div className="dashboard-detailsBar-footer-comment-item" key={item.id}>
								<div className="dashboard-detailsBar-footer-comment-item-header">
									<div className="dashboard-detailsBar-footer-comment-item-image">
										<img src={DefaultImage} alt="DNDeveloper"/>
									</div>
									<div className="dashboard-detailsBar-footer-comment-item-title">
										<p>{item.author}</p>
									</div>
									<div className="dashboard-detailsBar-footer-comment-item-timeStamp">
										<p>{moment(item.timeStamp).fromNow()}</p>
									</div>
								</div>
								<div className="dashboard-detailsBar-footer-comment-item-desc">
									<p>{item.value}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			}

			<div className="dashboard-detailsBar-footer-bottom-bar">
				<div />
				<div className="flexCentered">
					<div className="dashboard-detailsBar-footer-item" onClick={() => handleCommentState.toggleVisible()}>
						{commentState.isVisible ? <CommentsFillIcon /> : <CommentIcon/>}
					</div>
					<Dropdown
						ItemComponent={() =>
							footerOptions.map((options) => (
								options.Component ? <TaskAttachment onUpload={onUpload} key={options.id} options={options} /> :
									<div
										className="flex pv-10 pl-20 pr-10 itemHoverEffect pointer"
										onClick={() => null}
										key={options.id}
									>
										<div className="mr-10 flexCentered">
											<options.Icon fill={"rgba(0,0,0,0.3)"} />
										</div>
										<div className="heading_6">
											{options.name}
										</div>
									</div>
							))
						}
						containerStyle={{
							padding: ".7rem 0",
						}}
						handle={
							<div className="dashboard-detailsBar-footer-item">
								<DotsMenuHorizontal />
							</div>
						}
					/>
				</div>
			</div>
		</div>
	)
}

export default DetailsBarFooter;
