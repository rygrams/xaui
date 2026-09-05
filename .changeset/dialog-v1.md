---
'@xaui/native': patch
---

`Dialog` — Trigger · Overlay · Content · Title · Description · Close

The `Popover` without an anchor. Same portal, same context re-provision, same overlay
keyframes; none of the measuring pass, the host origin or the collision flip, because a
centred box has nothing to be measured against.

Two things it adds.

**The backdrop dims**, where the `Popover`'s paints nothing until a `backgroundColor` says
so. A popover is an aside you read the page around; a dialog is a question, and the page
behind it is not available until it is answered. `isDismissable={false}` is for one that
must be answered rather than escaped.

**It grows from its own centre**, 200 ms from `scale: 0.94`. A popover's entrance is offset
towards the thing that opened it so the motion points back at it; a dialog belongs to the
screen rather than to a control, so the absence of a direction is the message.

The content is two layers, and the outer one is not decoration: a centred box cannot also
be the thing that centres it. The outer layer fills the portal and does the centring, the
panel is the box, and the outer one takes no touches — so a press that misses the panel
reaches the overlay under it and closes the dialog.

No `variant`: the question a dialog asks is in its words, not in its fill.

It also unblocks the `presentation` prop that `Select.Content` and `Menu.Content` are
written around but cannot offer — HeroUI has both, and `dialog` was half of what was
missing.
