<div id="information">
	<div class="info-left">
		<div class="information current">Information</div>
		<div class="change-password">Change password</div>
		<div class="info-close">CLOSE</div>
	</div>
	<div class="info-right">
		<div class="tab-info">
			<div class="info-edit"><i class="fas fa-user-edit"></i></div>
			<div class="info-back" hidden="true"><i class="fas fa-undo-alt"></i></div>
			<div class="avatar">
				<img src="../img/cashiers/<?php echo $manager["avatar"] == '' ? 'nami.jpg' : $manager['avatar'] ?>">
				<div class="update-avatar" hidden="true">
					<input type="file" name="file" class="avatar_cashier" id="file">
					<label class="foot" for="file">
						<i class="fas fa-camera" aria-hidden="true"></i> Update avatar
					</label>
				</div>
			</div>
			<div class="cashier_username">
				<label class="label-username">Username</label>
				<input type="text" class="form-control edit-username" value="<?php echo $manager["fullname"] ?>" disabled="true">
				<div class="notBlank">
                    <i class="fas fa-exclamation-circle icon-warn"></i>
                    <label for="" class="eBlank">Please fill out this field</label>
                </div>
			</div>
			<div class="cashier_phone">
				<label class="label-phone">Phone</label>
				<input type="text" class="form-control edit-phone" value="<?php echo $manager["phone"] ?>" disabled="true" maxlength="10">
				<div class="notBlank">
                    <i class="fas fa-exclamation-circle icon-warn"></i>
                    <label for="" class="eBlank">Please fill out this field</label>
                </div>
			</div>
			<div class="cashier_address">
				<label class="label-address">Address</label>
				<input type="text" class="form-control edit-address" value="<?php echo $manager["address"] ?>" disabled="true">
			</div>
			<button class="info-save btn btn-success" hidden="true">Save</button>
		</div>
		<div class="tab-change-password" hidden="true">
			<form>
				<div class="form-group">
					<label for="current-password">Current password</label>
					<input type="password" class="form-control" id="current-password" placeholder="">
					<div class="notBlank">
	                    <i class="fas fa-exclamation-circle icon-warn"></i>
	                    <label for="" class="eBlank">Please fill out this field</label>
	                </div>
				</div>
				<div class="form-group">
					<label for="new-password">New password</label>
					<input type="password" class="form-control" id="new-password" placeholder="">
					<div class="notBlank">
	                    <i class="fas fa-exclamation-circle icon-warn"></i>
	                    <label for="" class="eBlank">Please fill out this field</label>
	                </div>
				</div>
				<div class="form-group">
					<label for="confirm-new-password">Confirm new password</label>
					<input type="password" class="form-control" id="confirm-new-password" placeholder="">
					<div class="notBlank">
	                    <i class="fas fa-exclamation-circle icon-warn"></i>
	                    <label for="" class="eBlank">Please fill out this field</label>
	                </div>
				</div>
				<button class="password-save btn btn-success">Save</button>
			</form>
		</div>
	</div>
</div>