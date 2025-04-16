import { useState, useEffect } from "react";
import { useTranslation }   from "react-i18next";
import { useLocation } from "react-router-dom";
import {
  Alert,
  AlertColor,
  Badge,
  Box,
  IconButton,
  Popper,
  Fade,
  Button,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Stack
} from "@mui/material";
// import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from '@mui/icons-material/Notifications';
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import CheckIcon from "@mui/icons-material/Check";

import { useNotificationCenter } from "react-toastify/addons/use-notification-center";
import { toast, TypeOptions, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import http from '@services/user.service';


const types = ["success", "info", "warning", "error"];

export function notify(type, message, rtl) {
  // console.log(`\n\n=====> Notifications.Component --> notify() : ${message}`)
  toast(message, {
    position: rtl === 'rtl' ? "bottom-right" : "bottom-left",
    className: 'foo-bar',
    type: type,
  });
}

export default function Notifications({ user, token, from }) {
  const { t, i18n }             = useTranslation("notifications");
  const location                = useLocation();
  const {
        notifications,
        clear,
        remove,
        markAllAsRead,
        markAsRead,
        unreadCount,
        add }                   = useNotificationCenter();

  const [showUnreadOnly, 
        setShowUnreadOnly]      = useState(false);
  const [isOpen, setIsOpen]     = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  // const [ dir, setDir ] = useState(i18n.dir())

  /************** CHAT GPT *******************/
  const [notificationsPage, setNotificationsPage] = useState(1);
  const [notificationsLimit, setNotificationsLimit] = useState(5);

  const totalPages = Math.ceil(
    (showUnreadOnly
      ? notifications.filter((v) => !v.read).length
      : notifications.length) / notificationsLimit
  );

  const paginatedNotifications = () => {
    const startIndex = (notificationsPage - 1) * notificationsLimit;
    const endIndex = startIndex + notificationsLimit;

    return (
      (showUnreadOnly
        ? notifications.filter((v) => !v.read)
        : notifications
      ).slice(startIndex, endIndex)
    );
  };

  const handlePageChange = (newPage) => {
    setNotificationsPage(newPage);
  };

  const fetchNotifications = () => {

    try {
      const controller = new AbortController()

      http.init(`/comingFrom/${from}/Notifications`)
      // http.init(`${location.pathname}syndicateNotification`)

      http.getXATdata('notifications', 'all', {
        skip: notificationsPage - 1,
        limit: notificationsLimit
      }, controller)
      .then(res => {
        // console.log(`\n\n=====> Notifications.Component --> fetchNotifications() - then : ${res}`)
        res.data.data.notifications.map((element, index) => {
          add({
            id: element.id,
            content: element.notificationText,
            type: element.notificationType,
            read: element.notificationTarget.targetRead
          })
        })
      })
      .catch(err => {
        console.log(`\n\n=====> Notifications.Component --> fetchNotifications() - catch : ${err}`)
      })

    } catch (error) {
      console.log(`\n\n=====> Notifications.Component --> fetchNotifications() - try catch : ${error}`)
    }
  };

  const readNotification = (id) => {

    try {

      const controller = new AbortController()

      http.patchXATdata('notifications', 'read', id, {}, controller.signal)
        .then(res => {
          console.log(`\n\n=====> Notifications.Component --> readNotification() - then : ${res}`)
          markAsRead(id)
        })
        .catch(err => {
          console.log(`\n\n=====> Notifications.Component --> readNotification() - catch : ${err}`)
        })

    } catch (error) {
      console.log(`\n\n=====> Notifications.Component --> readNotification() - try catch : ${error}`)
    }
  };

  const deleteNotification = (id) => {

    try {

      const controller = new AbortController()

      http.patchXATdata('notifications', 'delete', id, {}, controller.signal)
        .then(res => {
          console.log(`\n\n=====> Notifications.Component --> deleteNotification() - then : ${res}`)
          remove(id)
        })
        .catch(err => {
          console.log(`\n\n=====> Notifications.Component --> deleteNotification() - catch : ${err}`)
        })

    } catch (error) {
      console.log(`\n\n=====> Notifications.Component --> deleteNotification() - try catch : ${error}`)
    }
  };

  useEffect(() => {
    setNotificationsPage(1); // Reset to the first page whenever filters change

    if (token) {
      fetchNotifications(); // Fetch notifications when the component mounts
    }

  }, [showUnreadOnly, i18n, i18n.dir(), user, token]);
  /************** CHAT GPT *******************/

  const addNotification = () => {
    // use a random type of notification
    toast(i18n.dir() === 'rtl' ? "عرض لمقالة في مدونة فرايز بواسطة أي إيتين نكست" : "Lorem ipsum dolor sit amet, consectetur adipiscing elit", {
      type: types[Math.floor(Math.random() * types.length)],
      position: i18n.dir() === 'rtl' ? "bottom-right" : "bottom-left",
    });
  };

  const toggleNotificationCenter = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(!isOpen);
  };

  const toggleFilter = (e) => {
    setShowUnreadOnly(!showUnreadOnly);
  };

  return (
    <>
      {
        user && token
          ?
          (<Box sx={{ margin: "8px" }}>
            <IconButton size="large" onClick={toggleNotificationCenter}>
              <Badge badgeContent={unreadCount} color="primary">
                <NotificationsIcon color="action" />
              </Badge>
            </IconButton>

            <Popper open={isOpen} anchorEl={anchorEl} transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Box>

                    {/* Notifications Centre Popup */}
                    <Box
                      sx={{
                        background: "#666",
                        padding: "8px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h5" color="#fff">
                        Notification center
                      </Typography>

                      <FormGroup sx={{ color: "#fff" }}>
                        <FormControlLabel
                          control={
                            <Switch
                              color="secondary"
                              onChange={toggleFilter}
                              checked={showUnreadOnly}
                            />
                          }
                          label="Show unread only"
                        />
                      </FormGroup>

                    </Box>

                    {/* Notifications List */}
                    <Stack
                      sx={{
                        height: "400px",
                        width: "min(60ch, 100ch)",
                        padding: "12px",
                        background: "#f1f1f1",
                        borderRadius: "8px",
                        overflowY: "auto",
                      }}
                      spacing={2}
                    >
                      {(!paginatedNotifications().length ||
                        (unreadCount === 0 && showUnreadOnly)) && (
                          <h4>
                            Your queue is empty! you are all set{" "}
                            <span role="img" aria-label="dunno what to put">
                              🎉
                            </span>
                          </h4>
                        )}
                      {paginatedNotifications().map((notification) => (
                        <Alert
                          key={notification.id}
                          severity={(notification.type || "info")}
                          action={
                            notification.read ? (
                              <CheckIcon />
                            ) : (
                              <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                                onClick={() => { deleteNotification(notification.id) }}
                              >
                                <MarkChatReadIcon />
                              </IconButton>
                            )
                          }
                        >
                          {notification.content}
                        </Alert>
                      ))}
                    </Stack>

                    {/* Notifications Controle Buttons */}
                    <Box
                      sx={{
                        background: "#666",
                        padding: "8px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Button variant="contained" onClick={clear}>
                        Clear All
                      </Button>

                      <Button variant="contained" onClick={addNotification}>
                        Push some notifications
                      </Button>

                      <Button variant="contained" onClick={markAllAsRead}>
                        Mark all as read
                      </Button>
                    </Box>

                    {/* Pagination */}
                    <Box sx={{ textAlign: "center", marginTop: "8px" }}>
                      <Typography variant="body2">
                        Page {notificationsPage} of {totalPages}
                      </Typography>
                      <Button
                        size="small"
                        onClick={() => handlePageChange(notificationsPage - 1)}
                        disabled={notificationsPage === 1}
                      >
                        Previous
                      </Button>
                      <Button
                        size="small"
                        onClick={() => handlePageChange(notificationsPage + 1)}
                        disabled={notificationsPage === totalPages}
                      >
                        Next
                      </Button>
                    </Box>
                  </Box>
                </Fade>
              )}
            </Popper>

            <ToastContainer rtl={i18n.dir() === 'rtl' ? true : false} />
          </Box>)
          :
          null
      }
    </>
  );

  // return (
  //   <Box sx={{ margin: "8px" }}>
  //     <IconButton size="large" onClick={toggleNotificationCenter}>
  //       <Badge badgeContent={unreadCount} color="primary">
  //         <NotificationsIcon color="action" />
  //       </Badge>
  //     </IconButton>

  //     <Popper open={isOpen} anchorEl={anchorEl} transition>
  //       {({ TransitionProps }) => (
  //         <Fade {...TransitionProps} timeout={350}>
  //           <Box>
  //             <Box
  //               sx={{
  //                 background: "#666",
  //                 padding: "8px",
  //                 display: "flex",
  //                 justifyContent: "space-between",
  //                 alignItems: "center"
  //               }}
  //             >
  //               <Typography variant="h5" color="#fff">
  //                 Notification center
  //               </Typography>
  //               <FormGroup sx={{ color: "#fff" }}>
  //                 <FormControlLabel
  //                   control={
  //                     <Switch
  //                       color="secondary"
  //                       onChange={toggleFilter}
  //                       checked={showUnreadOnly}
  //                     />
  //                   }
  //                   label="Show unread only"
  //                 />
  //               </FormGroup>
  //             </Box>
  //             <Stack
  //               sx={{
  //                 height: "400px",
  //                 width: "min(60ch, 100ch)",
  //                 padding: "12px",
  //                 background: "#f1f1f1",
  //                 borderRadius: "8px",
  //                 overflowY: "auto"
  //               }}
  //               spacing={2}
  //             >
  //               {(!notifications.length ||
  //                 (unreadCount === 0 && showUnreadOnly)) && (
  //                 <h4>
  //                   Your queue is empty! you are all set{' '}
  //                   <span role="img" aria-label="dunno what to put">
  //                     🎉
  //                   </span>
  //                 </h4>
  //               )}
  //               {(showUnreadOnly
  //                 ? notifications.filter((v) => !v.read)
  //                 : notifications
  //               ).map((notification) => {
  //                 return (
  //                   <Alert
  //                     severity={(notification.type || "info")}
  //                     action={
  //                       notification.read ? (
  //                         <CheckIcon />
  //                       ) : (
  //                         <IconButton
  //                           color="primary"
  //                           aria-label="upload picture"
  //                           component="span"
  //                           onClick={() => markAsRead(notification.id)}
  //                         >
  //                           <MarkChatReadIcon />
  //                         </IconButton>
  //                       )
  //                     }
  //                   >
  //                     {notification.content}
  //                   </Alert>
  //                 );
  //               })}
  //             </Stack>
  //             <Box
  //               sx={{
  //                 background: "#666",
  //                 padding: "8px",
  //                 display: "flex",
  //                 justifyContent: "space-between",
  //                 alignItems: "center"
  //               }}
  //             >
  //               <Button variant="contained" onClick={clear}>
  //                   Clear All
  //               </Button>

  //               <Button variant="contained" onClick={notify}>
  //                 Push some notifications
  //               </Button>

  //               <Button variant="contained" onClick={markAllAsRead}>
  //                 Mark all as read
  //               </Button>
  //             </Box>
  //           </Box>
  //         </Fade>
  //       )}
  //     </Popper>

  //     <ToastContainer />
  //   </Box>
  // );
}
