import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';

import { FooActions } from './store/foo/actions';
import { fooResult, fooLoading } from './store/foo/selectors';
import { usersList, usersLoading } from './store/users/selectors';
import { commentsList, commentsLoading } from './store/comments/selectors';
import { UsersActions } from './store/users/actions';
import { CommentsActions } from './store/comments/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @select(fooLoading) public loading$: Observable<boolean>;
  @select(fooResult) public foo$: Observable<any>;
  @select(usersList) public users$: Observable<any>;
  @select(commentsList) public comments$: Observable<any>;

  public foo = '';
  public fooLoading = fooLoading;
  public usersLoading = usersLoading;
  public commentsLoading = commentsLoading;

  constructor(
    private fooActions: FooActions,
    private usersActions: UsersActions,
    private commentsActions: CommentsActions,
  ) { }

  public ngOnInit(): void {
    this.usersActions.fetchUsers();
    this.commentsActions.fetchComments();
  }

  public setFoo(): void {
    this.fooActions.setFoo(this.foo);
  }
}
